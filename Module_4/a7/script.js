const metropolia_position = [60.224033089819386, 24.759099994741263];
const map = L.map('map').setView(metropolia_position, 15);

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

function format_duration(duration) {
  const minutes_total = Math.round(duration / 60)
  if (minutes_total < 60) {
    return `${minutes_total} min`
  }
  const hours = Math.floor(minutes_total / 60)
  const mins = minutes_total % 60
  if (mins === 0) {
    return `${hours} h`
  }
  else return `${hours} h ${mins} min`
}

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
          trip {
            routeShortName
          }
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

      let used_lines = []
      let total_distance = 0

      for (let i = 0; i < legs.length; i++) {
        let color = '';
        switch (legs[i].mode) {
          case 'WALK':
            color = '#6b7280';
            break;
          case 'BUS':
            color = '#3b82f6';
            break;
          case 'RAIL':
            color = '#a855f7';
            break;
          case 'TRAM':
            color = '#22c55e';
            break;
          case 'SUBWAY':
            color = '#ef4444';
            break;
          default:
            color = '#2563eb';
            break;
        }

        const route = legs[i].legGeometry.points;
        const pointObjects = L.Polyline.fromEncoded(route).getLatLngs();
        const polyline = L.polyline(pointObjects, {
          color: color,
          weight: 4,
          opacity: 1
        });
        polyline.addTo(routeLayer);

        if (legs[i].trip && legs[i].trip.routeShortName) {
          used_lines.push(`${legs[i].mode} ${legs[i].trip.routeShortName}`)
        }
        total_distance += legs[i].distance


      }
      const transport_txt = used_lines.join(", ")

      L.marker([origin.latitude, origin.longitude]).addTo(routeLayer)
        .bindPopup('You start from here');

      map.fitBounds([
        [origin.latitude, origin.longitude],
        [target.latitude, target.longitude]
      ]);
      route_info.textContent = `From: ${origin.label} To: ${target.label}`
      route_info.textContent +=  `\nStart time: ${startTime} \nEnd time: ${endTime}`
      route_info.textContent +=  `\nApproximate traveling time: ${format_duration(itinerary.duration)}`
      route_info.textContent +=  `\nRoute distance: ${(total_distance / 1000).toPrecision(5)} km`
      route_info.textContent +=  `\nUsed transport: ${transport_txt}`
    })
    .catch(function (e) {
      console.error(e.message);
      route_info.textContent = e.message;
    });
}