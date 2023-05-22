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
$("#currentCity").text("Today's Date" + " - " + currentDate.format("MMM D, YYYY"));

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
    var requestLatLonUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&appid=0dfeca27786a8a8c837f120f88c9a791";

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
            var requestWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + locLat + "&lon=" + locLon + "&units=imperial&appid=0dfeca27786a8a8c837f120f88c9a791";
            
            fetch(requestWeatherUrl)
            .then(function (response) {
                JSON.stringify(response);
                return response.json();
            })
            .then(function (data1) {
                console.log("This is from CURRENT weather request");
                console.log(data1);
                $("#currentCity").text(inputCity.charAt(0).toUpperCase() + inputCity.slice(1) + " - " + dayjs().format("MMM D, YYYY"));
                $("#currentTemp").text("Temp: " + Math.round(data1.main.temp) + "° F");
                $("#currentWind").text("Wind: " + Math.round(data1.wind.speed) + " - " + getDirection(data1.wind.deg));
                $("#currentHumid").text("Humidity: " + data1.main.humidity + "%");
            })
        }, 1000
    );

    // fetch request to get weather forecast, setTimeout from above applies to this fetch as well
    setTimeout(
        function getForecast() {
            var requestForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + locLat + "&lon=" + locLon + "&units=imperial&appid=0dfeca27786a8a8c837f120f88c9a791";
            fetch(requestForecastUrl)
            .then(function (response) {
                JSON.stringify(response);
                return response.json();
            })
            .then(function (data2) {
                console.log("This is from FORECAST weather request");
                console.log(data2);
                var iter = 1;
                // 5 day forecast data population from fetched data2
                // console.log(data2.list[5].dt_txt);
                for (var i = 0; i < data2.list.length; i++) {
                    if (data2.list[i].dt_txt.includes("18:00:00") === true) {
                        $("#fiveTemp" + iter).text("Temp: " + Math.round(data2.list[i].main.temp));
                        $("#fiveWind" + iter).text("Wind: " + Math.round(data2.list[i].wind.speed) + " - " + getDirection(data2.list[i].wind.deg));
                        $("#fiveHumid" + iter).text("Temp: " + Math.round(data2.list[i].main.humidity));
                        iter++;
                    }   
                }
            })
            // change button text back to 'Submit'
            $("#cityInputBtn").text("Submit");
        }, 1000
    );
});
