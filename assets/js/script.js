// dependencies
var day1= $('#day1');
var day2= $('#day2');
var day3= $('#day3');
var day4= $('#day4');
var day5= $('#day5');
var forecast= $('#forecast')
var forecastIcon = $('.forecast-icon');
var forecastTemp = $('.forecast-temp');
var forecastWind = $('.forecast-wind');
var forecastHumidity= $('.forecast-humidity')
var locationInputEl = $('#location')
var searchBtn = $('#search-btn');

searchBtn.on('click', function() {
    console.log(locationInputEl.val())
})
// DATA

// functions

// retrieve location data on form/button click

// convert location data into coordinates


function writeIcon(data) {
    for (var i=0; i < forecast.children().length; i++ ){
        var iconCode = data.list[7+(i*8)].weather[0].icon
        forecast.children().eq(i).children().eq(1).children().eq(0).attr("src", 'http://openweathermap.org/img/wn/'+ iconCode + '@2x.png')
    }
}

function writeTemp(data){
    for (var i=0; i < forecast.children().length; i++ ){
        forecast.children().eq(i).children().eq(1).children().eq(1).text(data.list[7+(i*8)].main.temp.toFixed() + '°F')
    }
}

function writeWind(data){
    for (var i=0; i < forecast.children().length; i++ ){
        forecast.children().eq(i).children().eq(1).children().eq(2).text(data.list[7+(i*8)].wind.speed +'mph')
    }
}

function writeHumidity(data){
    for (var i=0; i < forecast.children().length; i++ ){
        forecast.children().eq(i).children().eq(1).children().eq(3).text(data.list[7+(i*8)].main.humidity +'%')
    }
}
// call API with provided coordinates and write data to cards
function getAPI() {
    var requestURL= "https://api.openweathermap.org/data/2.5/forecast?lat=41.053429&lon=-73.538734&units=imperial&appid=b442f7cbd3dba47d0df28083d882bce6"

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            writeIcon(data);
            writeTemp(data);
            writeWind(data);
            writeHumidity(data);
            return data
        })   
}


// convert UTC unix stamp to local time??


getAPI()

console.log(moment().format('LL'))