// creating modal variable
var $modal = $(".modal");

// modal
$modal.dialog({
    modal: true,
    buttons: [
      {
        text: "Yes!",
        click: function() {
          $( this ).dialog( "close" );
        }
      },
      {
        text: "No, I'll be wearing gloves.",
        click: function() {
            $( this ).dialog( "close" );
          }
      }
    ],
    minWidth: 400,
  });

  // Google maps

  var initMap = function () {

    map = new google.maps.Map(document.getElementById('localgardenmap'), {
        center: { lat: 47.6142, lng: -122.1937 },
        zoom: 12
    });
  }