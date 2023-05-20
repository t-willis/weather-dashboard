// input fields for geocoding api request lat/lon
// var inputZip = "";
// var inputCity = "";

// empty variables to store lat/lon after geocoding api request
// var locLat = "";
// var locLon = "";


// TEST VARIABLES
var inputZip = "37027";
var locLat = "36.0063";
var locLon = "-86.7909";
var inputCity = "";


// function to fetch lat/lon based on user input for city name or zip code
// function getGeoApi() {
//     var requestLatLonUrl = "http://api.openweathermap.org/geo/1.0/zip?zip=" + inputZip + "&appid=0dfeca27786a8a8c837f120f88c9a791";

//     fetch(requestLatLonUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             locLat = data.lat;
//             locLon = data.lon;
//             console.log(locLat);
//             console.log(locLon);
//         })
// }

// getGeoApi();


// function to fetch weather data based on lat/lon as requested from previous fetch request
// function getWeather() {
//     var requestWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + locLat + "&lon=" + locLon + "&units=imperial&appid=0dfeca27786a8a8c837f120f88c9a791";
    
//     fetch(requestWeatherUrl)
//     .then(function (response) {
//         JSON.stringify(response);
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     })
// }

// getWeather();

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// DO NOT DELETE WHAT IS ABOVE YOU NEED IT FOR LATER
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!