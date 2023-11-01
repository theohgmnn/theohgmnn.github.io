var map = L.map('map').setView([46.2043907, 6.1431577], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function onMapClick(e) {
    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
}

map.on('click', onMapClick);