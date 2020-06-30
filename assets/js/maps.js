function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });
        
        var input = document.getElementById('map-search');
        var searchBox = new google.maps.places.SearchBox(input);
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);*********** 
        
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
        
       var markers = [];
       searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          };
          
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];
          
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            
            
          var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
            
            markers.push(new google.maps.Marker(
              
              { map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location}

                ,{ map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location}

                ,{ map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location}

                
            ));
                


            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      };





//--------------- To be integrated later ----------// 
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: {
      lat: 46.619261,
      lng: -33.134766,
    },
  });
  var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  var locations = [
    { lat: 53.3562, lng: 6.3053 },
    { lat: 40.7829, lng: 73.9654 },
    { lat: 30.2677, lng: 97.7667 },
    { lat: 59.3275, lng: 18.0543 },
  ];

  var markers = locations.map(function (location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length],
    });
  });

  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
}
