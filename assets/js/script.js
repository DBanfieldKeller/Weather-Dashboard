// dependencies

function getAPI() {
    var requestURL= "https://api.openweathermap.org/data/2.5/forecast?lat=41.053429&lon=73.538734&appid=b442f7cbd3dba47d0df28083d882bce6"

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
}

getAPI()