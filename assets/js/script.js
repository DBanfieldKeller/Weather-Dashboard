// dependencies
var day1= $('#day1');
var day2= $('#day2');
var day3= $('#day3');
var day4= $('#day4');
var day5= $('#day5');

console.log(day1.children().eq(0).text())
// DATA

// functions

// retrieve location data on form/button click

// convert location data into coordinates

// call API with provided coordinates
function getAPI() {
    var requestURL= "https://api.openweathermap.org/data/2.5/forecast?lat=41.053429&lon=-73.538734&units=imperial&appid=b442f7cbd3dba47d0df28083d882bce6"

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.list[0].weather[0].icon)
            day1.children().eq(1).children().eq(0).text(data.list[0].weather[0].icon)
            day1.children().eq(1).children().eq(1).text(data.list[0].main.temp.toFixed() + ' °F')
            day1.children().eq(1).children().eq(2).text(data.list[0].wind.speed + ' mph')
        })
}
// convert UTC unix stamp to local time??

// write weather from API to each card

getAPI()

console.log(moment().format('LL'))