const GVA_COORD = [46.2043907, 6.1431577];
const MAP_ZOOM = 12;
const W_HD = 1280;
const H_HD = 720;

let map = L.map('map').setView(GVA_COORD, MAP_ZOOM);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

if (localStorage.getItem("markers") == null) {
    localStorage.setItem("markers", "[]");
}

map.on('click', (e) => { onMapClick(e) });

for (const btn of btnReturn) {
    btn.addEventListener('click', () => {
        sectionMap.style.display = "block";
        sectionVideo.style.display = "none";
        sectionPicture.style.display = "none"
        sectionMarker.style.display = "none"
    });
}

if (JSON.parse(localStorage.getItem("markers")).length != 0) {
    let markers = JSON.parse(localStorage.getItem("markers"));
    for (const point of markers) {
        let marker = L.marker([parseFloat(point.lat), parseFloat(point.lng)]).on('click', (e) => { onMarkerClick(e) });
        marker.addTo(map);
    }
}

function onMapClick(e) {
    let marker = L.marker([e.latlng.lat, e.latlng.lng]).on('click', (e) => { onMarkerClick(e) });
    marker.addTo(map);
}

async function onMarkerClick(e) {
    if (localStorage.getItem("markers") != "") {
        let storage = JSON.parse(localStorage.getItem("markers"));
        for (const marker of storage) {
            if (marker.lat == e.latlng.lat && marker.lng == e.latlng.lng) {
                sectionMap.style.display = "none";
                sectionMarker.style.display = "block";

                imgMarker.src = marker.picture;
                lat.innerHTML = `Lat: ${marker.lat}`;
                lng.innerHTML = `Lng: ${marker.lng}`;

                return;
            }
        }
    }

    const constraints = {
        video: {
            width: { ideal: W_HD },
            height: { ideal: H_HD },
            facingMode: { exact: "environment" },
        }
    };

    let stream = await navigator.mediaDevices.getUserMedia(constraints);

    sectionMap.style.display = "none";
    sectionVideo.style.display = "block";

    myVideo.srcObject = stream;

    btnPicture.addEventListener("click", () => btnPictureClick(e.latlng));
}

function btnPictureClick(latlng) {
    myCanvas.width = myVideo.videoWidth;
    myCanvas.height = myVideo.videoHeight;
    myCanvas.getContext('2d').drawImage(myVideo, 0, 0);

    myVideo.srcObject.getTracks().forEach(track => track.stop())

    sectionVideo.style.display = "none";
    sectionPicture.style.display = "block";

    let picture = myCanvas.toDataURL("image/jpeg");

    let marker = { lat: latlng.lat, lng: latlng.lng, picture: picture };

    if (JSON.parse(localStorage.getItem("markers")).length != 0) {
        let storage = JSON.parse(localStorage.getItem("markers"));

        storage.push(marker);
        localStorage.setItem("markers", JSON.stringify(storage));
    }
    else {
        let markers = [];
        markers.push(marker);
        localStorage.setItem("markers", JSON.stringify(markers));
    }
}