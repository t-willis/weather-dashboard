var locLat = "";
var locLon = "";
var currentDate = dayjs();
var inputCity = "";


$("#clearPrev").on("click", function() {
    location.reload();
    localStorage.clear();
});

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


$("#cityInputBtn").on("click", function() {
    inputCityFormat = $("#cityInput").val();
    inputCity = inputCityFormat.charAt(0).toUpperCase() + inputCityFormat.slice(1);
    
    getCoords(inputCity);
    $("#cityInputBtn").text("please wait...");

    var prevSearchEl = $('<button class="button is-fullwidth is-link is-small mb-1 prevButton">' + inputCity + '</button>');
    $("#previousSearches").append(prevSearchEl);
    $(".prevButton").on("click", function() {
        inputCity = ($(this).text());
        getCoords($(this).text());
    });

    document.getElementById("cityInput").value = "";
    
})


function getCoords(inp) {
    var reqLatLon = "https://api.openweathermap.org/geo/1.0/direct?q=" + inp + "&appid=0dfeca27786a8a8c837f120f88c9a791";
    
    fetch(reqLatLon)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        locLat = Math.trunc(data[0].lat);
        locLon = Math.trunc(data[0].lon);
        getCurrent(locLat, locLon);
        getFiveDay(locLat, locLon);
        addLocal(inputCity);
    })
};


function getCurrent(lat, lon) {
    var reqCurWea = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=0dfeca27786a8a8c837f120f88c9a791";
    
    fetch(reqCurWea)
    .then(function (response) {
        JSON.stringify(response);
        return response.json();
    })
    .then(function (data1) {
        popCurrent(data1);
    })
};


function getFiveDay(lat, lon) {
    var reqFivWea = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=0dfeca27786a8a8c837f120f88c9a791";
    
    fetch(reqFivWea)
    .then(function (response) {
        JSON.stringify(response);
        return response.json();
    })
    .then(function (data2) {
        popFiveDay(data2);
    })
};


function popCurrent(data1) {
    $("#currentCity").text(inputCity + " - " + dayjs().format("MMM D, YYYY"));
    $("#currentTemp").text("Temp: " + Math.round(data1.main.temp) + "° F");
    $("#currentWind").text("Wind: " + Math.round(data1.wind.speed) + " - " + getDirection(data1.wind.deg));
    $("#currentHumid").text("Humidity: " + data1.main.humidity + "%");
    $("#currentIcon").attr({src:"https://openweathermap.org/img/wn/" + data1.weather[0].icon + ".png", alt: data1.weather[0].description});
};


function popFiveDay(data2) {
    var iter = 1;
    for (let i = 0; i < data2.list.length; i++) {
        if (data2.list[i].dt_txt.includes("18:00:00") === true) {
            $("#fiveTemp" + iter).text("Temp: " + Math.round(data2.list[i].main.temp) + "° F");
            $("#fiveWind" + iter).text("Wind: " + Math.round(data2.list[i].wind.speed) + " - " + getDirection(data2.list[i].wind.deg));
            $("#fiveHumid" + iter).text("Humidity: " + data2.list[i].main.humidity + "%");
            $("#fiveIcon" + iter).attr({src: "https://openweathermap.org/img/wn/" + data2.list[i].weather[0].icon + ".png", alt: data2.list[i].weather[0].description});
            iter++;
        }
    }
    $("#cityInputBtn").text("Submit");
};


function addLocal(inputCity) {
    
    if (!localStorage.getItem("city")) {
        cityStorage = [];
        cityStorage.push({inputCity});
        localStorage.setItem("city", JSON.stringify(cityStorage));
    } else if (!localStorage.getItem("city").includes(inputCity)) {
        cityStorage = JSON.parse(localStorage.getItem("city"));
        cityStorage.push({inputCity});
        localStorage.setItem("city",JSON.stringify(cityStorage));
    }
};


var prevLS = [];
function addPrev() {
    var prevLS = JSON.parse(localStorage.getItem("city"));

    for (let i = 0; i < prevLS.length; i++) {
        var prevSearchEl = $('<button class="button is-fullwidth is-link is-small mb-1 prevButton">' + prevLS[i].inputCity + '</button>');
        $("#previousSearches").append(prevSearchEl);
        
        // $(".prevButton").on("click", function() {
        //     console.log("test");
        // })
        
    }
    
}
addPrev();

$(".prevButton").on("click", function() {
    inputCity = ($(this).text());
    getCoords($(this).text());
});

