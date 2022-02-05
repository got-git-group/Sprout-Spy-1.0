// geocoder for zip code to location conversations
var geocoder;
// Service to query community gardens
var service;
// The map to display them all
var map;
// Infowindow
var infowindow;
// Coords to center the map initially
var coords = { lat: 47.6142, lng: -122.1937 };

// Google maps
var initMap = function () {

    map = new google.maps.Map(document.getElementById('localgardenmap'), {
      center: coords,
      zoom: 11
    });
  
    geocoder = new google.maps.Geocoder();
  
    infowindow = new google.maps.InfoWindow();

    service = new google.maps.places.PlacesService(map);
}  