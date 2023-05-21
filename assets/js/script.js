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
// var inputCity = "San Francisco ";


// just for zips, might not use
// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
// function to fetch lat/lon based on user input for city name
// function getGeoApi() {
//     var requestLatLonUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&appid=0dfeca27786a8a8c837f120f88c9a791";

//     fetch(requestLatLonUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             locLat = data[0].lat;
//             locLon = data[0].lon;
//             console.log(locLat);
//             console.log(locLon);
//             console.log(data);
//         })
// }

// getGeoApi();


// function to fetch weather data based on lat/lon as requested from previous fetch request
// function getWeather() {
//     var requestWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + locLat + "&lon=" + locLon + "&units=imperial&appid=0dfeca27786a8a8c837f120f88c9a791";
    
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

// Empty string to be determined by form input
var inputCity = "";
var locLat = "";
var locLon = "";


// eventListener/click event to grab form input, then run api request using city name
$("#cityInputBtn").on("click", function() {
    inputCity = $("#cityInput").val();
    console.log("This is from the form input, #inputCity");
    console.log(inputCity);
    function getGeoApi() {
    var requestLatLonUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&appid=0dfeca27786a8a8c837f120f88c9a791";

    fetch(requestLatLonUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            locLat = data[0].lat;
            locLon = data[0].lon;
            console.log("This is from requestLatLonUrl");
            console.log("locLat var = " + locLat);
            console.log("locLon var = " + locLon);
        })
    }
    getGeoApi();

    setTimeout(
        function getWeather() {
            var requestWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + locLat + "&lon=" + locLon + "&units=imperial&appid=0dfeca27786a8a8c837f120f88c9a791";
            
            fetch(requestWeatherUrl)
            .then(function (response) {
                JSON.stringify(response);
                return response.json();
            })
            .then(function (data1) {
                console.log("This is from CURRENT weather request");
                console.log(data1);
            })
        }, 2000
    );

    setTimeout(
        function getForecast() {
            var requestForecastUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + locLat + "&lon=" + locLon + "&units=imperial&appid=0dfeca27786a8a8c837f120f88c9a791";

            fetch(requestForecastUrl)
            .then(function (response) {
                JSON.stringify(response);
                return response.json();
            })
            .then(function (data2) {
                console.log("This is from FORECAST weather request");
                console.log(data2);
            })
        }, 2000
    );
    
        
});

