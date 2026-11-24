//basic map with one marker
const map = L.map("map").setView([-1.2864, 36.8172], 7);
L.marker([-1.2864, 36.8172]).addTo(map);
// basemap
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const satellite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  { attribution: "Tiles &copy; Esri" },
);

const light = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  {
    attribution: "&copy; OpenStreetMap, &copy; CARTO",
  },
);

//five cities with popups
const cities = [
  {
    name: "Nairobi",
    coords: [-1.2864, 36.8172],
    info: "Capital city of Kenya",
  },
  {
    name: "Mombasa",
    coords: [-4.0435, 39.6682],
    info: "Major port city on the coast",
  },
  {
    name: "Kisumu",
    coords: [-0.0917, 34.768],
    info: "Port city on Lake Victoria",
  },
  {
    name: "Nakuru",
    coords: [-0.3031, 36.08],
    info: "Gateway to the Rift Valley lakes",
  },
  {
    name: "Eldoret",
    coords: [0.5143, 35.2698],
    info: "Major city in the North Rift",
  },
];

const cityLayer = L.layerGroup();
cities.forEach((city) => {
  L.marker(city.coords)
    .bindPopup(`<b>${city.name}</b><br>${city.info}`)
    .addTo(cityLayer);
});
cityLayer.addTo(map);

//import and display a GeoJSON File
const geoLayer = L.geoJSON(null, {
  onEachFeature: (feature, layer) => {
    layer.bindPopup(
      `<b>${feature.properties.name}</b><br>${feature.properties.type}`,
    );
  },
}).addTo(map);

fetch("data.geojson")
  .then((response) => response.json())
  .then((data) => geoLayer.addData(data))
  .catch((error) => console.error("GeoJSON failed to load:", error));

//Layer control
L.control
  .layers(
    { OpenStreetMap: osm, Satellite: satellite, Light: light },
    { Cities: cityLayer, "GeoJSON data": geoLayer },
  )
  .addTo(map);

//Nav bar buttons actions
document.getElementById("btn-nairobi").addEventListener("click", () => {
  map.flyTo([-1.2864, 36.8172], 11);
});

document.getElementById("btn-mombasa").addEventListener("click", () => {
  map.flyTo([-4.0435, 39.6682], 11);
});
document.getElementById("btn-eldoret").addEventListener("click", () => {
  map.flyTo([0.5143, 35.2698], 11);
});

document.getElementById("btn-reset").addEventListener("click", () => {
  map.setView([0.2, 37.9], 6);
});
