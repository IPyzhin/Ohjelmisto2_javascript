const metropolia_position = [60.224033089819386, 24.759099994741263];

const map = L.map('map').setView(metropolia_position, 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.marker(metropolia_position).addTo(map)
  .bindPopup('Metropolia');

const routeLayer = L.layerGroup().addTo(map);

const apiKey = "32043635dd004308b28e00021e4a4cdb";
const apiAddressSearch = "https://api.digitransit.fi/geocoding/v1/search";
const apiAddress = 'https://api.digitransit.fi/routing/v2/hsl/gtfs/v1';

const form = document.querySelector('form');
const queryInput = document.querySelector('#query');
const route_info = document.getElementById('route_info');

form.addEventListener('submit', async function (evt) {
  evt.preventDefault();

  const query = queryInput.value.trim();
  if (!query) return;

  try {
    const response = await fetch(
      `${apiAddressSearch}?text=${encodeURIComponent(query)}&layers=address`,
      {
        headers: {
          'digitransit-subscription-key': apiKey
        }
      }
    );

    const jsonData = await response.json();

    if (jsonData.features && jsonData.features.length > 0) {
      const first = jsonData.features[0];
      const [lon, lat] = first.geometry.coordinates;

      const origin = {
        latitude: lat,
        longitude: lon,
        label: first.properties.label
      };

      const target = {
        latitude: metropolia_position[0],
        longitude: metropolia_position[1],
        label: 'Metropolia Karamalmi campus'
      };

      getRoute(origin, target);
    } else {
      route_info.textContent = 'Address not found';
      routeLayer.clearLayers();
    }
  } catch (error) {
    console.log('SEARCH ERROR:', error);
    route_info.textContent = error.message;
  }
});

function getRoute(origin, target) {
  routeLayer.clearLayers();

  const GQLQuery = `{
    plan(
      from: {lat: ${origin.latitude}, lon: ${origin.longitude}}
      to: {lat: ${target.latitude}, lon: ${target.longitude}}
      numItineraries: 1
    ) {
      itineraries {
        startTime
        endTime
        duration
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
      'digitransit-subscription-key': apiKey,
    },
    body: JSON.stringify({ query: GQLQuery }),
  };

  fetch(apiAddress, fetchOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      const itinerary = result.data.plan.itineraries[0];
      const legs = itinerary.legs;

      const startTime = new Date(itinerary.startTime).toLocaleTimeString('fi-FI', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const endTime = new Date(itinerary.endTime).toLocaleTimeString('fi-FI', {
        hour: '2-digit',
        minute: '2-digit'
      });

      route_info.textContent = `From: ${origin.label} To: ${target.label}`
      route_info.textContent +=  `\nStart time: ${startTime}, \nEnd time: ${endTime}`

      for (let i = 0; i < legs.length; i++) {
        let color = '';

        switch (legs[i].mode) {
          case 'WALK':
            color = 'green';
            break;
          case 'BUS':
            color = 'red';
            break;
          case 'RAIL':
            color = 'cyan';
            break;
          case 'TRAM':
            color = 'magenta';
            break;
          default:
            color = 'blue';
            break;
        }

        const route = legs[i].legGeometry.points;
        const pointObjects = L.Polyline.fromEncoded(route).getLatLngs();

        L.polyline(pointObjects, { color }).addTo(routeLayer);
      }

      L.marker([origin.latitude, origin.longitude]).addTo(routeLayer)
        .bindPopup('You start from here');

      map.fitBounds([
        [origin.latitude, origin.longitude],
        [target.latitude, target.longitude]
      ]);
    })
    .catch(function (e) {
      console.error(e.message);
      route_info.textContent = e.message;
    });
}