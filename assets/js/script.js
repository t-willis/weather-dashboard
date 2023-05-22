// Empty string to be determined by form input
var inputCity = "";
var locLat = "";
var locLon = "";

// dayjs things
var currentDate = dayjs();
var dateplus = currentDate.add(1, 'day');

// populate current date
$("#currentCity").text("Today's Date" + " - " + currentDate.format("MMM D, YYYY"));
// for loop to populate future dates in 5 day forecast
for (var i = 1; i < 6; i++) {
    $("#fiveDate" + [i]).text(currentDate.add([i], 'day').format("MMM D, YYYY"));
}

// function to determine direction of wind by degree 0-360
function getDirection(angle) {
    var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    var windDirec = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[windDirec];
}

// eventListener/click event to grab form input, then run api request using city name
$("#cityInputBtn").on("click", function() {
    inputCity = $("#cityInput").val();
    // force inputCity variable to have uppercase for first letter
    inputCity = inputCity.charAt(0).toUpperCase()+ inputCity.slice(1);
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
            var prevSearchEl = $('<button id="justatest" class="button is-fullwidth is-link is-small mb-1">' + inputCity + '</button>');
            console.log(data1);
                localStorage.setItem("cityName", inputCity);
                $("#previousSearches").append(prevSearchEl);
                $("#currentCity").text(inputCity + " - " + dayjs().format("MMM D, YYYY"));
                $("#currentTemp").text("Temp: " + Math.round(data1.main.temp) + "° F");
                $("#currentIcon").attr({src:"https://openweathermap.org/img/wn/" + data1.weather[0].icon + ".png", alt: data1.weather[0].description})
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
                var iter = 1;
                // 5 day forecast data population from fetched data2
                for (var i = 0; i < data2.list.length; i++) {
                    if (data2.list[i].dt_txt.includes("18:00:00") === true) {
                        $("#fiveTemp" + iter).text("Temp: " + Math.round(data2.list[i].main.temp) + "° F");
                        $("#fiveWind" + iter).text("Wind: " + Math.round(data2.list[i].wind.speed) + " - " + getDirection(data2.list[i].wind.deg));
                        $("#fiveHumid" + iter).text("Temp: " + Math.round(data2.list[i].main.humidity));
                        $("#fiveIcon" + iter).attr({src: "https://openweathermap.org/img/wn/" + data2.list[i].weather[0].icon + ".png", alt: data2.list[i].weather[0].description})

                        iter++;
                    }   
                }
            })
            // change button text back to 'Submit'
            $("#cityInputBtn").text("Submit");
        }, 1000
    );
});
