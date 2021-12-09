

// this function calls the API to retrieve data and send it to the displayWeather function
function getWeather(cityName) {
    let URL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=af25342231667911f3ebe786f4537f3d";

    fetch(URL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // console.log('this is the daily weather data');
            // console.log(data);
            displayWeather(data);
            getFiveDayWeather(data);
        })
        .catch(error => {
            alert ('City not found!');
            return;
        })
}


// this function receives data and sends it to the correct elements.
function displayWeather(data) {

let weatherIcon = data.weather[0].icon;    
let iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";


$('.resultNameEL').text(data.name);
$(".dailyIMG").attr("src", iconURL);
let temp = Math.trunc(((data.main.temp-273.15)*1.8)+32);
$('.tempEL').text("Temp: " + temp + ' deg F');
$('.windEl').text("Wind Speed: " + data.wind.speed + ' mph');
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
            // console.log('this is the 5 day weather data');
            // console.log(data);
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
        let weatherIcon = data.daily[i].weather[0].icon;    
        let iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
  

        //this appends the generated data onto the dashboard's element
        $('.fiveDayResultsEl').addClass('border border-dark d-flex flex-row');
        let newDayEl = $('.fiveDayResultsEl').append('<div>' + '<h3>' + date + '</h3>' + '<img src=\"' + iconURL +'\"></img> <div> Temp: ' + temp + ' deg F</div> <div> Wind: ' + wind + ' mph</div><div> Humidity: ' + humidity + '</div>');
        

    }

}


function prevSearch(inputCity) {
    let prevSearch = localStorage.getItem('prevCity');
    // console.log(prevSearch);
    
    let cityArray = [];


    //if there is no value in localstorage for prevSearch.... add in the input as the first value.
    if(prevSearch === null) {
        // console.log("prevCity value is null");
        cityArray[0] = inputCity;
        let cityLocal = JSON.stringify(cityArray);
        localStorage.setItem('prevCity', cityLocal);
        return;
    } else {        // if there is a list of cities.... turn value back into an array... check array to add inputCity and save new array
        // console.log("the value of prevCity is " + prevSearch);
        cityArray = JSON.parse(prevSearch);
        // console.log(typeof prevSearch);
            if (cityArray.includes(inputCity)) {
                prevCitybtns(cityArray);
                return;
            }
        cityArray.push(inputCity);
        let cityLocal = JSON.stringify(cityArray);
        localStorage.setItem('prevCity', cityLocal);
        prevCitybtns(cityArray);
        return;
    }
         

}

//takes the value from local storage of previous cities and creates a button for each one that fetches data.
function prevCitybtns(cityArray) {

    // console.log(cityArray.length);
    for (let i = 0; i < cityArray.length; i++) {
        // console.log(cityArray[i]);
        $('.list-group').append('<li id = \"' + cityArray[i] + '\">' + cityArray[i] + '</li>')
    }
    return;
}

// This is where all the script starts....

$('.searchBtn').click(function() {
    var input = $(this).siblings('textarea').val();

    if(!input) {
        alert('Please enter a city!');
        return;

    }

    $('.fiveDayResultsEl').empty();
    getWeather(input);
    prevSearch(input);

});


