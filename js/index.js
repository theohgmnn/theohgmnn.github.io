async function getCountries(){
    var tab = [];
    var response = await fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => showCountries(data));
}

function showCountries(data) {
    let ul = document.querySelector("select");
    let html = "";

    for (const pays of data) {
        html += "<option value='" + pays.name.common + "'> " + pays.name.common + " </option>";
    }

    ul.innerHTML = html;
}

getCountries();