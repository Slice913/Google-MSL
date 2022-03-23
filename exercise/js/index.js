let map;

function initMap() {
 // let storeMarker = {lat: 34.063380, lng: -118.358080};
 let losAngeles = {lat: 34.063380, lng: -118.358080};
 map = new google.maps.Map(document.getElementById("map"), {
   mapId: "45ccadd4b9f9c635",
   center: losAngeles,
   zoom: 8,
 });
 getStores();
} 

const getStores = () => {
  const API_URL = 'http://localhost:3000/api/stores';
    fetch(API_URL)
     .then((response)=>{
        if(response.status == 200){
            return response.json();
        } else {
            throw new Error(response.status);
        }
     }).then((data) =>{
        searchLocationsNear(data);
    })
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
                    ${phone}
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
         label:`${storeNumber}`,
        });
    
 marker.setMap(map);

    const infoWindow = new google.maps.InfoWindow({
        content: html,
        });

        marker.addListener("click", () => {
            infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    });
   // infoWindow.close();
}
    
  
 
   
