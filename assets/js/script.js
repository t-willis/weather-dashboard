// input fields for geocoding api request lat/lon
var inputZip = "37027";


// empty variables to store lat/lon after geocoding api request
var locLat = "";
var locLon = "";


// function to fetch lat/lon based on user input for city name or zip code
// function getGeoApi() {
//     var requestUrl = "http://api.openweathermap.org/geo/1.0/zip?zip=" + inputZip + "&appid=0dfeca27786a8a8c837f120f88c9a791";

//     fetch(requestUrl)
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
// DO NOT DELETE WHAT IS ABOVE YOU NEED IT FOR LATER
