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
var inputCity = "San Francisco ";


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

// dayjs things
var currentDate = dayjs();
var dateplus = currentDate.add(1, 'day');
// for loop to populate future dates in 5 day forecast
for (var i = 1; i < 6; i++) {
    $("#fiveDate" + [i]).text(currentDate.add([i], 'day').format("MMM D, YYYY"));
}
$("#currentCity").text("Todays Date" + " - " + currentDate.format("MMM D, YYYY"));

// function to determine direction of wind by degree 0-360
function getDirection(angle) {
    var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    var windDirec = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[windDirec];
}



// eventListener/click event to grab form input, then run api request using city name
$("#cityInputBtn").on("click", function() {
    inputCity = $("#cityInput").val();
    console.log("This is from the form input, #inputCity");
    console.log(inputCity);
    // change button text to 'please wait' while data is being fetched
    $("#cityInputBtn").text("please wait");
    function getGeoApi() {
    var requestLatLonUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&appid=0dfeca27786a8a8c837f120f88c9a791";

    // fetch request to set lat/lon variables
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

    // fetch request to get current weather, setTimeout to make sure it happens AFTER the lat/lon fetch
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
                $("#currentCity").text(inputCity + " - " + dayjs().format("MMM D, YYYY"));
                $("#currentTemp").text("Temp: " + Math.round(data1.main.temp) + "° F");
                $("#currentWind").text("Wind: " + Math.round(data1.wind.speed) + " - " + getDirection(data1.wind.deg));
                $("#currentHumid").text("Humidity: " + data1.main.humidity + "%");
            })
        }, 2000
    );

    // fetch request to get weather forecast, setTimeout from above applies to this fetch as well
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
                // 5 day forecast data population from fetched data2
                // 1 of 5
                $("#fiveTemp1").text("Temp: " + Math.round(data2.list[0].main.temp) + "° F");
                $("#fiveWind1").text("Wind: " + Math.round(data2.list[0].wind.speed) + " - " + getDirection(data2.list[0].wind.deg));
                $("#fiveHumid1").text("Humidity: " + data2.list[0].main.humidity + "%");
                // 2 of 5
                $("#fiveTemp2").text("Temp: " + Math.round(data2.list[0].main.temp) + "° F");
                $("#fiveWind2").text("Wind: " + Math.round(data2.list[0].wind.speed) + " - " + getDirection(data2.list[0].wind.deg));
                $("#fiveHumid2").text("Humidity: " + data2.list[0].main.humidity + "%");
                // 3 of 5
                $("#fiveTemp3").text("Temp: " + Math.round(data2.list[0].main.temp) + "° F");
                $("#fiveWind3").text("Wind: " + Math.round(data2.list[0].wind.speed) + " - " + getDirection(data2.list[0].wind.deg));
                $("#fiveHumid3").text("Humidity: " + data2.list[0].main.humidity + "%");
                // 4 of 5
                $("#fiveTemp4").text("Temp: " + Math.round(data2.list[0].main.temp) + "° F");
                $("#fiveWind4").text("Wind: " + Math.round(data2.list[0].wind.speed) + " - " + getDirection(data2.list[0].wind.deg));
                $("#fiveHumid4").text("Humidity: " + data2.list[0].main.humidity + "%");
                // 5 of 5
                $("#fiveTemp5").text("Temp: " + Math.round(data2.list[0].main.temp) + "° F");
                $("#fiveWind5").text("Wind: " + Math.round(data2.list[0].wind.speed) + " - " + getDirection(data2.list[0].wind.deg));
                $("#fiveHumid5").text("Humidity: " + data2.list[0].main.humidity + "%");
            })
            // change button text back to 'Submit'
            $("#cityInputBtn").text("Submit");
        }, 2000
    );
});

