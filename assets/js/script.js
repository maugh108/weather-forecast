const APIkey = "25193229136a8f4f79ec1c1878946711";
var cityNameEl = document.getElementById("city-name");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidEl = document.getElementById("humid");
var cardcontEl = document.getElementById("weather-cards");

function getEmoji(weather) {

    var clearSky = " ☀️";
    var rain = " 🌧";
    var clouds = " 🌥";

    if (weather.includes("rain")){
        return rain;
    } else if (weather.includes("clear")) {
        return clearSky;
    } else if (weather.includes("clouds")) {
        return clouds;
    }
}

function renderData(foreCast) {

    cityNameEl.textContent = foreCast.city.name + getEmoji(foreCast.list[0].weather[0].description);
    tempEl.textContent = "Temperature: "+ foreCast.list[0].main.temp + "°C";
    windEl.textContent = "Wind: "+ foreCast.list[0].wind.speed + " m/s";
    humidEl.textContent = "Humidity: "+ foreCast.list[0].main.humidity + "%";

    for ( var  i = 1; i <= 5; i++) {
        
        var today = moment().add(i, 'days').calendar();
        var dayF = moment(today).format('l');  
        var day = "day" + i;
        var pT = "pT" + i;
        var pW = "pW" + i;
        var pH = "pH" + i;
        var em = "em" + i;
        var dayEl = document.getElementById(day);
        var pTEl = document.getElementById(pT);
        var pWEl = document.getElementById(pW);
        var pHEl = document.getElementById(pH);
        var emEl = document.getElementById(em);

        dayEl.textContent = moment().add( i, 'days').calendar();
        emEl.textContent = getEmoji(foreCast.list[i].weather[0].description);      
        pTEl.textContent = "Temperature: " + foreCast.list[i].main.temp + "°C";
        pWEl.textContent = "Wind: "+ foreCast.list[i].wind.speed + " m/s";
        pHEl.textContent = "Humidity: "+ foreCast.list[i].main.humidity + "%";
    }

    return; 

}

function getForecast(lat, lon) {

    const url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=6&appid=" + APIkey + "&units=metric";
    
    fetch(url).then(function (response) {
       
        if (response.ok) {
            response.json().then(function (data) {
              renderData(data);
            });
          } else {
          console.log("404");
        }
      });
}

function getData(zipCode, countryCode) {

    let url = "https://api.openweathermap.org/geo/1.0/zip?zip=" + zipCode + "," + countryCode + "&appid=" + APIkey;
    
    fetch(url).then(function (response) {
       
        if (response.ok) {
            response.json().then(function (data) {
                getForecast(data.lat, data.lon)
            });
          } else {
          console.log("404");
        }
      });

    
};

getData("06300", "MX");







