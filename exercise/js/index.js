let map;
let infoWindow;
let markers = [];

function initMap() {
 // let storeMarker = {lat: 34.063380, lng: -118.358080};
 let losAngeles = {lat: 34.063380, lng: -118.358080};
 map = new google.maps.Map(document.getElementById("map"), {
   mapId: "45ccadd4b9f9c635",
   center: losAngeles,
   zoom: 8,
  });
  infoWindow = new google.maps.InfoWindow();
}   


const getStores = () => {
    const zipCode = document.getElementById('zip-code').value;
    if(!zipCode) {
        return;
    }
    const API_URL = 'http://localhost:3000/api/stores';
    const fullUrl = `${API_URL}?zip_code=${zipCode}`;
    fetch(fullUrl)
    .then((response)=>{
        if(response.status == 200){
            return response.json();
        } else {
            throw new Error(response.status);
        }
    }).then((data) =>{
        clearLocations();
        searchLocationsNear(data);
        setStoresList(data);
        setOnClickListener();
    })
}

const clearLocations = () => {
    infoWindow.close();
    for (let i= 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}



const setOnClickListener = () => {
    let storeElements = document.querySelectorAll('.store-container');
    storeElements.forEach((elem, index)=>{
        elem.addEventListener('click', ()=>{
            google.maps.event.trigger(markers[index], 'click');
        })
    })
 }

// function to loop over stores and get (address, phone number, index) of each store.
const setStoresList = (stores) => {
    let storeListHtml = '';
    stores.forEach((store, index)=>{
            storeListHtml += `
             <div class="store-container">
               <div class="store-container-background">
                   <div class="store-info-container">
                       <div class="store-address">
                           <span>${store.addressLines[0]}</span>
                           <span>${store.addressLines[1]}</span>
                       </div>
                       <div class="store-phone-number">${store.phoneNumber}</div>
                   </div>
                   <div class="store-number-container">
                       <div class="store-number">
                           ${index+1}
                       </div>
                    </div>
                 </div>
              </div>`;

      })
      document.querySelector('.stores-list').innerHTML = storeListHtml;
     }

const searchLocationsNear = (stores) => {
    let bounds = new google.maps.LatLngBounds();
    stores.forEach((store, index)=>{
        let latlng = new google.maps.LatLng(
            store.location.coordinates[1],
            store.location.coordinates[0]
            );
        let name = store.storeName;
        let address = store.addressLines[0];
        let openStatusText = store.openStatusText;
        let phone = store.phoneNumber;
        bounds.extend(latlng);
        createMarker(latlng, name, address, openStatusText, phone, index+1);
        
    });
    map.fitBounds(bounds);
    
}

  const createMarker = (latlng, name, address, openStatusText, phone, storeNumber) => {
    let html =  `
        <div class="store-info-window">
            <div class="store-info-name">
                ${name}
            </div>
            <div class="store-info-open-status">
                ${openStatusText}
            </div>
            <div class="store-info-address">
                <div class="icon">
                    <i class="fas fa-location-arrow"></i>
                </div>
                <span>
                    ${address}
                </span>  
            </div>
            <div class="store-info-phone">
                <div class="icon">
                     <i class="fas fa-phone-alt"></i>
                </div>
                <span>
                  <a href="tel:${phone}">${phone}</a>
                </span>
            </div>
        </div>
    `
    let customMarker = {
         url: "https://img.icons8.com/fluency/2x/marker-storm.png", 
         scaledSize: new google.maps.Size(25, 25), 
         origin: new google.maps.Point(0,0),
         anchor: new google.maps.Point(0, 0)
        };
 
     let marker = new google.maps.Marker({
         map: map,
         position: latlng,
         icon: customMarker,
         label: `${storeNumber}`,
         
        });
    
 marker.setMap(map);

      google.maps.event.addListener(marker, "click", () => {
       infoWindow.open(map, marker);
       infoWindow.setContent(html);
    });
    markers.push(marker);
    
}