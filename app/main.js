let map = L.map('map').setView([46.2043907, 6.1431577], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', (e) => { onMapClick(e) });

document.querySelector("#return").addEventListener('click', () => {
    let sectionMap = document.querySelector("#sectionMap");
    let sectionVideo = document.querySelector("#sectionVideo");
    let sectionPicture = document.querySelector("#sectionPicture");

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

async function onMarkerClick(e) {
    let storage = JSON.parse(localStorage.getItem("markers"));

    if (storage != null) {
        for (const marker of storage) {
            if (marker.lat == e.lat && marker.lng == e.lng) {
                let sectionMap = document.querySelector("#sectionMap");
                let sectionMarker = document.querySelector("#sectionMarker");
                let img = document.querySelector("#sectionMarker img");
                let pLat = document.querySelector("p#lat")
                let pLng = document.querySelector("p#lng")
    
                sectionMap.style.display = "none";
                sectionMarker.style.display = "block";
    
                img.src = marker.picture;
                pLat.innerHTML = `Lat: ${marker.lat}`;
                pLng.innerHTML = `Lng: ${marker.lng}`;
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

    let myVideo = document.querySelector("#myVideo");
    let sectionMap = document.querySelector("#sectionMap");
    let sectionVideo = document.querySelector("#sectionVideo");
    let sectionPicture = document.querySelector("#sectionPicture");

    sectionMap.style.display = "none";
    sectionVideo.style.display = "block";

    myVideo.srcObject = stream;

    let btnPicture = document.querySelector("#picture");
    btnPicture.addEventListener("click", () => {
        console.log("click")
        let myCanvas = document.querySelector("#myCanvas");
        myCanvas.width = myVideo.videoWidth;
        myCanvas.height = myVideo.videoHeight;
        myCanvas.getContext('2d').drawImage(myVideo, 0, 0);

        myVideo.srcObject.getTracks().forEach(track => track.stop())

        sectionVideo.style.display = "none";
        sectionPicture.style.display = "block";

        let picture = myCanvas.toDataURL();

        let markers = [];
        let marker = { lat: e.latlng.lat, lng: e.latlng.lng, picture: picture };
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
    })
}

function onMapClick(e) {
    let marker = L.marker([e.latlng.lat, e.latlng.lng]).on('click', (e) => { onMarkerClick(e) });
    marker.addTo(map);
}