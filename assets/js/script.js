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
  });