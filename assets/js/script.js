// dependencies
var forecast = $('#forecast')
var forecastIcon = $('.forecast-icon');
var forecastTemp = $('.forecast-temp');
var forecastWind = $('.forecast-wind');
var forecastHumidity = $('.forecast-humidity')
var locationInputEl = $('#location')
var searchBtn = $('#search-btn');
var recentSearches = $('#recent-searches');


// DATA
var apiKey = "b442f7cbd3dba47d0df28083d882bce6"
// only save last 5 search results
var historyLength = 5

// functions


// write dates for forecast
function writeDates() {
    for (var i = 0; i < forecast.children().length; i++) {
        forecast.children().eq(i).children().eq(0).text(moment().add((24 * (i + 1)), 'h').format('L'))
    }
}

// write icon data from forecast API
function writeIcon(data) {
    for (var i = 0; i < forecast.children().length; i++) {
        var iconCode = data.list[7 + (i * 8)].weather[0].icon
        forecast.children().eq(i).children().eq(1).children().eq(0).attr("src", 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png')
    }
}

// write temperature data from forecast API
function writeTemp(data) {
    for (var i = 0; i < forecast.children().length; i++) {
        forecast.children().eq(i).children().eq(1).children().eq(1).text(data.list[7 + (i * 8)].main.temp.toFixed() + '°F');
    }
}

// write windspeed from forecast API 
function writeWind(data) {
    for (var i = 0; i < forecast.children().length; i++) {
        forecast.children().eq(i).children().eq(1).children().eq(2).text(data.list[7 + (i * 8)].wind.speed + 'mph');
    }
}
// write Humidity from forecast API
function writeHumidity(data) {
    for (var i = 0; i < forecast.children().length; i++) {
        forecast.children().eq(i).children().eq(1).children().eq(3).text(data.list[7 + (i * 8)].main.humidity + '%');
    }
}

// write current date and city
function currentHeader(cityName) {
    $('#current-header').text(cityName + "  " + moment().format('LL'));
}

// write current icon
function currentIcon(data) {
    var iconCode = data.weather[0].icon
    $('#current-icon').attr("src", 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png')
}

// write current temperature

function currentTemp(data) {
    $('#current-temp').text(data.main.temp.toFixed() + '°F');
}

// write current windspeed

function currentWind(data) {
    $('#current-wind').text('Wind ' + data.wind.speed + 'mph')
}

// write current humdity

function currentHumidity(data) {
    $('#current-humidity').text(data.main.humidity + '%')
}

// write recent searches to history

function saveHistory(cityName) {
    var searchHistory = JSON.parse(localStorage.getItem("searches")) ?? [];
    // add item to history array
    searchHistory.unshift(cityName);
    // remove oldest item from history array
    searchHistory.splice(historyLength);
    // save new array
    localStorage.setItem("searches", JSON.stringify(searchHistory));

}

// write search history to buttons

function writeHistory() {
    var searchHistory = JSON.parse(localStorage.getItem("searches")) ?? [];
    for (var i = 0; i < searchHistory.length; i++) {
        recentSearches.children().eq(i).replaceWith('<button type="button" class="list-group-item list-group-item-action history-btn">' + searchHistory[i] + '</button>')
    }
}

// get forecast API and write data to each card, update history

function getAPIForecast(cityName) {
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
                writeDates();
                writeIcon(data);
                writeTemp(data);
                writeWind(data);
                writeHumidity(data);
                saveHistory(cityName);
                writeHistory()
                return data
            }
        })
}

// get current weather API and write data to jumbotron

function getAPICurrent(cityName) {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (data.cod === '404') {
                return
            } else {
                currentHeader(cityName);
                currentIcon(data);
                currentTemp(data);
                currentWind(data);
                currentHumidity(data);
            }
        })
}

// press button to produce weather items

searchBtn.on('click', function () {
    console.log(locationInputEl.val());
    var cityName = locationInputEl.val();
    getAPIForecast(cityName);
    getAPICurrent(cityName);
    console.log(JSON.parse(localStorage.getItem("searches")))
})

// write history to buttons on page opening
writeHistory();

// click on history button to view previous results
recentSearches.on('click', '.history-btn', function(){
    var cityName = $(this).text();
    getAPIForecast(cityName);
    getAPICurrent(cityName);
} )