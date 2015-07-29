/* Most of the following code was found at https://developers.google.com/maps/documentation/javascript/examples/map-geolocation */

var map;
var marker;

function watchPosition() {
	navigator.geolocation.getCurrentPosition(function(position) {
		// Clears all Markers from the map
		if (marker) {
			marker.setMap(null);
		}

		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

		marker = new google.maps.Marker({
			position: pos,
			title: 'You are here!'
		});

		marker.setMap(map);
	}, function() {
		handleNoGeolocation(true);
	});
}

function initialize() {
  var mapOptions = {
    zoom: 15
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			map.setCenter(pos);
		}, function() {
			handleNoGeolocation(true);
		})

		setInterval(function() {
			watchPosition();
		}, 3000);
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
