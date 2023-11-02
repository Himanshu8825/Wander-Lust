mapboxgl.accessToken = mapTopken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});



const marker = new mapboxgl.Marker({color:'red'}).setLngLat(coordinates).addTo(map);
