

// this function calls the API to retrieve data and send it to the displayWeather function
function getWeather(cityName) {
    let URL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=af25342231667911f3ebe786f4537f3d";

    fetch(URL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('this is the daily weather data');
            console.log(data);
            displayWeather(data);
            getFiveDayWeather(data);
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


function getFiveDayWeather(data) {
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    let URL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&appid=af25342231667911f3ebe786f4537f3d";

    fetch(URL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('this is the 5 day weather data');
            console.log(data);
            displayFiveDayWeather(data);
        })

}

function displayFiveDayWeather(data) {

    // this loops through each day generating the data...
    for(let i = 1; i <= 5; i++) {

        let date = moment().add(i, 'days').calendar();  
        let temp = Math.trunc(((data.daily[i].temp.day -273.15)*1.8)+32);
        let wind = data.daily[i].wind_speed;
        let humidity = data.daily[i].humidity;

        //this appends the generated data onto the dashboard's element
        let newDayEl = $('.fiveDayResultsEl').append('<div> </div>');

        newDayEl.append('<p>Date: ' + date + '</p>');
        newDayEl.append('<p> Temp: ' + temp + '</p>');
        newDayEl.append('<p> Wind: ' + wind + '</p>');
        newDayEl.append('<p> Humidity: ' + humidity + '</p>');



    }

}


// This is where all the script starts....

$('.btn').click(function() {
    var input = $(this).siblings('textarea').val();
    $('.fiveDayResultsEl').empty();
    getWeather(input);
}

)

