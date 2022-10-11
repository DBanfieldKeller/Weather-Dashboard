// dependencies
var day1 = $('#day1');
var day2 = $('#day2');
var day3 = $('#day3');
var day4 = $('#day4');
var day5 = $('#day5');
var forecast = $('#forecast')
var forecastIcon = $('.forecast-icon');
var forecastTemp = $('.forecast-temp');
var forecastWind = $('.forecast-wind');
var forecastHumidity = $('.forecast-humidity')
var locationInputEl = $('#location')
var searchBtn = $('#search-btn');


// DATA
var latitude
var longitude
var apiKey = "b442f7cbd3dba47d0df28083d882bce6"

// functions

// retrieve location data on form/button click



function writeIcon(data) {
    for (var i = 0; i < forecast.children().length; i++) {
        var iconCode = data.list[7 + (i * 8)].weather[0].icon
        forecast.children().eq(i).children().eq(1).children().eq(0).attr("src", 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png')
    }
}

function writeTemp(data) {
    for (var i = 0; i < forecast.children().length; i++) {
        forecast.children().eq(i).children().eq(1).children().eq(1).text(data.list[7 + (i * 8)].main.temp.toFixed() + '°F')
    }
}

function writeWind(data) {
    for (var i = 0; i < forecast.children().length; i++) {
        forecast.children().eq(i).children().eq(1).children().eq(2).text(data.list[7 + (i * 8)].wind.speed + 'mph')
    }
}

function writeHumidity(data) {
    for (var i = 0; i < forecast.children().length; i++) {
        forecast.children().eq(i).children().eq(1).children().eq(3).text(data.list[7 + (i * 8)].main.humidity + '%')
    }
}
// call API with provided coordinates and write data to cards

function getCoordinatesAPI() {
    var requestURL = "http://api.openweathermap.org/geo/1.0/direct?q=greenwich&limit=1&appid=" + apiKey;

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            latitude = data[0].lat;
            console.log(latitude);
            longitude = data[0].lon;
            return latitude
        })
}

getCoordinatesAPI();

console.log(latitude);


function getAPI(cityName) {
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (data.cod === '404') {
                alert('Invalid City Name')
            } else {
                writeIcon(data);
                writeTemp(data);
                writeWind(data);
                writeHumidity(data);
                return data
            }
        })
}


searchBtn.on('click', function () {
    console.log(locationInputEl.val());
    var cityName = locationInputEl.val();
    getAPI(cityName);
})



// convert UTC unix stamp to local time??






console.log(moment().format('LL'))