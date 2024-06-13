console.log("hi");



document.querySelector("#submit").addEventListener("click", searchCity)

fetch("https://api.meteo.lt/v1/places/adakavas/forecasts/long-term")
.then(response => {return response.json()})
.then(data => { printToConsole(data); })


function printToConsole(data) {
    console.log(data.place);
}

function searchCity(e){

e.preventDefault();
let city = document.querySelector("#city");
console.log(city.value);
callAPI(city.value);
city.value="";

}

function callAPI(city){
let url = "https://api.meteo.lt/v1/places/" + city + "/forecasts/long-term";
// console.log(url);
fetch(url)
.then(response => { return response.json(); })
.then(data => { printToConsole(data); })
}


function printToConsole(data) {
    console.log(data.forecastTimestamps[0].forecastTimeUtc);
    console.log(data.forecastTimestamps[0].airTemperature);
}


