// creating modal variable
var $modal = $(".modal");
// Coords to center the map initially
var coords = { lat: 47.6142, lng: -122.1937 };

// modal
$modal.dialog({
  modal: true,
  buttons: [
    {
      text: "Yes!",
      click: function () {
        $(this).dialog("close");
      }
    },
    {
      text: "No, I'll be wearing gloves.",
      click: function () {
        $(this).dialog("close");
      }
    }
  ],
  minWidth: 400,
});

// Google maps

var initMap = function () {

  map = new google.maps.Map(document.getElementById('localgardenmap'), {
    center: coords,
    zoom: 11
  });

  function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
  }

  var request = {
    location: coords,
    radius: '500', // Preferring results closer to the center point.
    query: 'community garden',
  }

  service = new google.maps.places.PlacesService(map);

  service.textSearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      console.log(results.length);
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  });
}