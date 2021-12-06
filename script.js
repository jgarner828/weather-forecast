

// this function calls the API to retrieve data and send it to the displayWeather function
function getWeather(cityName) {
    let URL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=af25342231667911f3ebe786f4537f3d";

    fetch(URL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayWeather(data);
        })
}


// this function receives data and sends it to the correct elements.
function displayWeather(data) {
$('.resultNameEL').text(data.name);
let temp = Math.trunc(((data.main.temp-273.15)*1.8)+32);
$('.tempEL').text("Temp: " + temp);
$('.windEl').text("Wind Speed: " + data.wind.speed);
$('.humidityEl').text("Humidity: " + data.main.humidity);
$('.uvIndex').text("UV Index: " + data.clouds.all);
}



// This is where all the script starts....


getWeather('Atlanta');