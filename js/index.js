async function getCountries() {
    var countries = [];
    var response = await fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                countries.push(data[i]['translations']['fra']['official']);
            }
        });
    console.log(countries)
    showCountries(countries);
    localStorage.setItem('countries', JSON.stringify(countries));
}

function showCountries(data) {
    let ul = document.querySelector("select");
    let html = "";

    for (const pays of data) {
        html += "<option value='" + pays + "'> " + pays + " </option>";
    }

    ul.innerHTML = html;
}

let local = localStorage.getItem('countries');
let localCountries = JSON.parse(local);
if (localCountries != null) {
    showCountries(localCountries);
}
else {
    getCountries();
}