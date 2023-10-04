async function getCountries(){
    var tab = [];
    var response = await fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => showCountries(data));
}

function showCountries(data) {
    let ul = document.querySelector("ul");

    ul.innerHTML = data;
}

getCountries();