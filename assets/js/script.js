// creating Welcome modal and zipmodal variable
var $modal = $(".modal");
var $zipModal = $(".zipModal");
// Coords to center the map initially
var coords = { lat: 47.6142, lng: -122.1937 };
// geocoder for zip code to location conversations
var geocoder;
// Service to query community gardens
var service;
// The map to display them all
var map;
// Infowindow
var infowindow;
// Array to store the community garden markers
var markers = [];
// creating input variable and search button variable
var zipInput = document.querySelector("#zip");
var searchBtn = document.querySelector("#button1");
// will be used later to pull zip value
var getZip;

// Defines the request for community gardens
var requestGardens = {
  location: coords,
  radius: '500', // Preferring results closer to the center point.
  query: 'community garden',
};

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

  geocoder = new google.maps.Geocoder();

  infowindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);

  getCommunityGardens(requestGardens);


};

var createMarker = function (place) {
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
  markers.push(marker);
};

// Function to search community gardens and create markers for them.
var getCommunityGardens = function (requestLocation) {
  markers = [];
  console.log(markers);
  console.log(requestLocation);
  service.textSearch(requestLocation, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      console.log(results.length);
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  });
}

var geocode = function (request) {
  clear();
  geocoder.geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);

      console.log(results[0].geometry.location.lat());
      requestGardens.location.lat = results[0].geometry.location.lat();
      requestGardens.location.lng = results[0].geometry.location.lng();
      console.log(requestGardens.location.lat);
      getCommunityGardens(requestGardens);
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

var clear = function () {
  setMapOnAll(null);
  markers = [];
}

// ZIPCODE INPUT
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  getZip = zipInput.value.trim();
  if (getZip.length !== 5) {
    // zipModal displays if zipcode entry is !5 character
    $zipModal.dialog({
      modal: true,
      minWidth: 400,
    })
  } else {
    console.log(getZip);
    // this is optional, if we don't want to store zipcodes we can scratch this
    localStorage.setItem("zip", JSON.stringify(getZip));
    geocode({ address: getZip });
    if ($zipModal.css('visibility') === 'hidden') {
      $zipModal.css('visibility', 'visible');
    } else {
      $zipModal.css('visibility', 'hidden');
    }
  }
});

function show() {
  paraP = document.getElementById('hidden');
}