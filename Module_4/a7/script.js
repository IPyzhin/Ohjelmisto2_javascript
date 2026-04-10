const map = L.map('map').setView([60.224033089819386, 24.759099994741263], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


/*const apiAddress = 'https://api.digitransit.fi/routing/v2/hsl/gtfs/v1';
const apiAddress_search = "https://api.digitransit.fi/geocoding/v1/"
const form = document.querySelector('#query')
const route_info = document.getElementById('route_info')
*/
/*function getRoute(origin, target) {
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

*/
const apiKey = "32043635dd004308b28e00021e4a4cdb";
const apiAddressSearch = "https://api.digitransit.fi/geocoding/v1/search";

const form = document.querySelector('form');
const queryInput = document.querySelector('#query');
const route_info = document.getElementById('route_info');

console.log('script loaded');
console.log('form:', form);
console.log('queryInput:', queryInput);
console.log('route_info:', route_info);

form.addEventListener('submit', async function (evt) {
  evt.preventDefault();
  console.log('submit fired');

  const query = queryInput.value.trim();
  console.log('query:', query);

  try {
    const response = await fetch(
      `${apiAddressSearch}?text=${encodeURIComponent(query)}&layers=address`,
      {
        headers: {
          'digitransit-subscription-key': apiKey
        }
      }
    );

    console.log('status:', response.status, 'ok:', response.ok);

    const jsonData = await response.json();
    console.log('jsonData:', jsonData);

    route_info.textContent = JSON.stringify(jsonData, null, 2);

    if (jsonData.features && jsonData.features.length > 0) {
      const first = jsonData.features[0];
      console.log('label:', first.properties.label);
      console.log('coords:', first.geometry.coordinates);
    }
  } catch (error) {
    console.log('SEARCH ERROR:', error);
    route_info.textContent = error.message;
  }
});

/*
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
        L.marker([origin.latitude, origin.longitude]).addTo(map)
            .bindPopup('You start from here')
        L.marker([target.latitude, target.longitude]).addTo(map)
            .bindPopup('Metropolia. You end you way here')
    }).catch(function (e) {
        console.error(e.message);
    });
}
getRoute({latitude: 60.192192, longitude: 25.032203}, {latitude: 60.22392713924583, longitude: 24.758060132939075})
*/




