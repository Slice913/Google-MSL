let map;

function initMap() {
   // let storeMarker = {lat: 34.063380, lng: -118.358080};
   let losAngeles = {lat: 34.063380, lng: -118.358080};
    map = new google.maps.Map(document.getElementById("map"), {
      mapId: "45ccadd4b9f9c635",
      center: losAngeles,
      zoom: 8,
     });

 const createMarker = () => {
   let customMarker = {
        url: "https://thumbs.dreamstime.com/b/racing-drone-pilot-logo-sport-mascot-naughty-bald-race-icon-character-illustration-cartoon-style-community-club-team-techcnology-152278415.jpg", 
        scaledSize: new google.maps.Size(50, 50), 
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 0)
       };

    let marker = new google.maps.Marker({
        map: map,
        position: {lat: 34.063380, lng: -118.358080},
        icon: customMarker,
       });

       marker.setMap(map);
    }
    createMarker();
}