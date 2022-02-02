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

  const infowindow = new google.maps.InfoWindow();
  
  function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
    // open a pop-up window to display address for the marker.
    google.maps.event.addListener(marker, 'click', () => {
      const content = document.createElement('div');
      const nameElement = document.createElement('h2');
      const addressElement = document.createElement('p');

      nameElement.textContent = place.name;
      addressElement.textContent = place.formatted_address;

      content.appendChild(nameElement);
      content.appendChild(addressElement);
      infowindow.setContent(content);
      infowindow.open(map, marker);
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