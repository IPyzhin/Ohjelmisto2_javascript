const map = L.map('map').setView([60.224033089819386, 24.759099994741263], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
L.marker([60.22392713924583, 24.758060132939075]).addTo(map)
    .bindPopup('Metropolia<br> You are here')

//document.getElementById("data").textContent = distance([60.224033089819386, 24.759099994741263],[60.224033089819386, 24.759099994741263])

const apiAddress = 'https://api.digitransit.fi/routing/v2/hsl/gtfs/v1';

function getRoute(origin, target) {
    // GraphQL query
    const GQLQuery = `{
  plan(
    from: {lat: ${origin.latitude}, lon: ${origin.longitude}}
    to: {lat: ${target.latitude}, lon: ${target.longitude}}
    numItineraries: 1
  ) {
    itineraries {
      legs {
        startTime
        endTime
        mode
        duration
        distance
        legGeometry {
          points
        }
      }
    }
  }
}`;

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
      'digitransit-subscription-key': '32043635dd004308b28e00021e4a4cdb',
        },
        body: JSON.stringify({query: GQLQuery}),
    };


    fetch(apiAddress, fetchOptions).then(function (response) {
        return response.json();
    }).then(function (result) {
        console.log(result.data.plan.itineraries[0].legs);
        const googleEncodedRoute = result.data.plan.itineraries[0].legs;
        for (let i = 0; i < googleEncodedRoute.length; i++) {
            let color = '';
            switch (googleEncodedRoute[i].mode) {
                case 'WALK':
                    color = 'green';
                    break;
                case 'BUS':
                    color = 'red';
                    break;
                case 'RAIL':
                    color = 'cyan'
                    break;
                case 'TRAM':
                    color = 'magenta'
                    break;
                default:
                    color = 'blue';
                    break;
            }
            const route = (googleEncodedRoute[i].legGeometry.points);
            const pointObjects = L.Polyline.fromEncoded(route).getLatLngs(); // fromEncoded: convert Google encoding to Leaflet polylines
            L.polyline(pointObjects).setStyle({
                color
            }).addTo(map);
        }
        map.fitBounds([[origin.latitude, origin.longitude], [target.latitude, target.longitude]]);
    }).catch(function (e) {
        console.error(e.message);
    });
}
getRoute({latitude: 60.192192, longitude: 25.032203}, {latitude: 60.22392713924583, longitude: 24.758060132939075})



