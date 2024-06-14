console.log("hi");



document.querySelector("#submit").addEventListener("click", searchCity)


fetch("https://api.meteo.lt/v1/places/adakavas/forecasts/long-term")
.then(response => {return response.json()})
.then(data => { printToConsole(data); displayWeatherData(data); 

});


// function printToConsole(data) {
//     console.log(data.place);
// }

function searchCity(e){

e.preventDefault();
let city = document.querySelector("#city");
console.log(city.value);
callAPI(city.value);
city.value="";

}

function callAPI(city){
let url = "https://api.meteo.lt/v1/places/" + city + "/forecasts/long-term";
console.log(url);
fetch(url)
.then(response => { return response.json(); })
.then(data => { printToConsole(data); displayWeatherData(data); })
}




function printToConsole(data) {

    const currentTime = new Date();

    let closestTimestamp = data.forecastTimestamps[0];
    let minTimeDifference = Math.abs(new Date(closestTimestamp.forecastTimeUtc) - currentTime);

    for (let timestamp of data.forecastTimestamps) {
        let forecastTime = new Date(timestamp.forecastTimeUtc);
        let timeDifference = Math.abs(forecastTime - currentTime);

        if (timeDifference < minTimeDifference) {
            closestTimestamp = timestamp;
            minTimeDifference = timeDifference;
        }

    }
        
    console.log("place - " + data.place.name);
    console.log("forecastTimeUtc - " + closestTimestamp.forecastTimeUtc);
    console.log("airTemperature - " + closestTimestamp.airTemperature);
    console.log("feelsLikeTemperature - " + closestTimestamp.feelsLikeTemperature);
    console.log("windSpeed - " + closestTimestamp.windSpeed);
    console.log("seaLevelPressure - " + closestTimestamp.seaLevelPressure);
    console.log("relativeHumidity - " + closestTimestamp.relativeHumidity);
    console.log("conditionCode - " + closestTimestamp.conditionCode);
}




function displayWeatherData(data) {

    const currentTime = new Date();

        let closestTimestamp = data.forecastTimestamps[0];
        let minTimeDifference = Math.abs(new Date(closestTimestamp.forecastTimeUtc) - currentTime);

        for (let timestamp of data.forecastTimestamps) {
            let forecastTime = new Date(timestamp.forecastTimeUtc);
            let timeDifference = Math.abs(forecastTime - currentTime);

            if (timeDifference < minTimeDifference) {
                closestTimestamp = timestamp;
                minTimeDifference = timeDifference;
            }

        }

    
    document.getElementById('forecastTimeUtc').textContent = "Forecast Time: " + closestTimestamp.forecastTimeUtc;
    document.getElementById('airTemperature').textContent = "Air Temperature: " + closestTimestamp.airTemperature + " °C";
    document.getElementById('feelsLikeTemperature').textContent = "Feels Like: " + closestTimestamp.feelsLikeTemperature + " °C";
    document.getElementById('windSpeed').textContent = "Wind Speed: " + closestTimestamp.windSpeed + " m/s";
    document.getElementById('seaLevelPressure').textContent = "Pressure: " + closestTimestamp.seaLevelPressure + " hPa";
    document.getElementById('relativeHumidity').textContent = "Humidity: " + closestTimestamp.relativeHumidity + " %";
    document.getElementById('conditionCode').textContent = "Condition: " + closestTimestamp.conditionCode;

}

