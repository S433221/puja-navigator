const pandals = [
  {
    name: "Bharati Road Sarbojanin",
    area: "B-Zone, Durgapur",
    theme: "Delhi Red Fort + Operation Sindoor 3D Laser Show",
    lat: 23.532,
    lng: 87.313,
    timing: "Laser Show: 6PM onwards",
    crowd: "High"
  },
  {
    name: "City Centre Puja",
    area: "City Centre, Durgapur",
    theme: "Kashi Vishwanath Replica",
    lat: 23.548,
    lng: 87.322,
    timing: "5PM - 12AM",
    crowd: "Medium"
  },
  {
    name: "Chitralaya Puja",
    area: "Benachity, Durgapur",
    theme: "Traditional Art",
    lat: 23.551,
    lng: 87.308,
    timing: "5PM - 11PM",
    crowd: "Low"
  }
];

// FIXED MAP - ab block nahi hoga
const map = L.map('map').setView([23.54, 87.32], 12);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &copy; CARTO',
  subdomains: 'abcd',
  maxZoom: 20
}).addTo(map);

let markers = [];

function render(list) {
  document.getElementById('pandal-list').innerHTML = "";
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h3>${p.name}</h3><p>${p.area}</p><p><b>Theme:</b> ${p.theme}</p><p><b>${p.timing}</b> <span class="badge">${p.crowd} Crowd</span></p>`;
    document.getElementById('pandal-list').appendChild(div);

    const marker = L.marker([p.lat, p.lng]).addTo(map)
      .bindPopup(`<b>${p.name}</b><br>${p.theme}`);
    markers.push(marker);
  });
}

render(pandals);

document.getElementById('search').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  const filtered = pandals.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.area.toLowerCase().includes(q) || 
    p.theme.toLowerCase().includes(q)
  );
  render(filtered);
});
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri'
}).addTo(map);