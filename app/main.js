let map = L.map('map').setView([46.2043907, 6.1431577], 12);
let latlng;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', (e) => { onMapClick(e) });

document.querySelector("#return").addEventListener('click', () => {
    sectionMap.style.display = "block";
    sectionVideo.style.display = "none";
    sectionPicture.style.display = "none"
})

if (localStorage.getItem("markers") != null) {
    let markers = JSON.parse(localStorage.getItem("markers"));
    for (const point of markers) {
        let marker = L.marker([parseFloat(point.lat), parseFloat(point.lng)]).on('click', (e) => { onMarkerClick(e) });
        marker.addTo(map);
    }
}

btnPicture.addEventListener("click", () => btnPictureClick());

function onMapClick(e) {
    let marker = L.marker([e.latlng.lat, e.latlng.lng]).on('click', (e) => { onMarkerClick(e) });
    latlng = e.latlng;
    marker.addTo(map);
}

async function onMarkerClick() {
    let storage = JSON.parse(localStorage.getItem("markers"));

    if (storage != null) {
        for (const marker of storage) {
            if (marker.lat == e.lat && marker.lng == e.lng) {
                let img = document.querySelector("#sectionMarker img");

                sectionMap.style.display = "none";
                sectionMarker.style.display = "block";

                img.src = marker.picture;
                lat.innerHTML = `Lat: ${marker.lat}`;
                lng.innerHTML = `Lng: ${marker.lng}`;
            }
        }
    }

    const constraints = {
        video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: { exact: "environment" },
        }
    };

    let stream = await navigator.mediaDevices.getUserMedia(constraints);

    sectionMap.style.display = "none";
    sectionVideo.style.display = "block";

    myVideo.srcObject = stream;
}

function btnPictureClick() {
    myCanvas.width = myVideo.videoWidth;
    myCanvas.height = myVideo.videoHeight;
    myCanvas.getContext('2d').drawImage(myVideo, 0, 0);

    myVideo.srcObject.getTracks().forEach(track => track.stop())

    sectionVideo.style.display = "none";
    sectionPicture.style.display = "block";

    let picture = myCanvas.toDataURL();

    let markers = [];
    let marker = { lat: latlng.lat, lng: latlng.lng, picture: picture };
    markers.push(marker);

    let storage = JSON.parse(localStorage.getItem("markers"));
    console.log(storage)
    if (storage != null) {
        for (const mark of storage) {
            markers.push(mark);
        }
    }

    console.log(markers);

    localStorage.setItem("markers", JSON.stringify(markers));
}