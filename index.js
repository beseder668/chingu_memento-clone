
// dom elements
let weatherTemp = document.querySelector('.o_nav_weather_temp');
let cityTemp = document.querySelector('.o_nav_weather_city');
let quoteText = document.querySelector('.c_body_quote');
let quoteAuthor = document.querySelector('.c_author');
let getInspired = document.querySelector('.c_body_btn');
let timeHours = document.querySelector('.c_body_hours');
let timeMins = document.querySelector('.c_body_mins');
let greetTime = document.querySelector('.c_body_greet');

// ipdata.co API key
const ipDataAPI = '036fd28dfd9c256becfed276d986a68bfcc84f1c1a537abe5db45fbe';
const openWeatherAPI = '34e34903211f898e98364abf5c6fb7ed';
let ipUrl = fetch(`https://api.ipdata.co?api-key=${ipDataAPI}`);

// unsplash api
// let unSplash = fetch('https://api.unsplash.com/');

// unSplash.then(response => response.json())
//     .then(response => {
//         console.log(response);
//     })
        
//     .catch(error => {
//         console.log(error);
//     })

ipUrl.then(response => response.json())
    .then(response => {
        let lat = response.latitude;
        let lon = response.longitude;

        getWeather(lat, lon, openWeatherAPI);  
        getCurrentTime();
    })
    .catch(error => {
        console.log(error);
    })

//  weater data request
function getWeather(lat, lon, openWeatherAPI) {

    let weatherData = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherAPI}`);

    weatherData.then(response => response.json())
        .then(response => {
            let tempData = {
                'temperature': response.main.temp,
                'icon': response.weather[0].icon,
                'conditions': response.weather[0].main,
                'city': response.name,
            };

            insertDataToDom(weatherTemp, tempRounded(tempData.temperature) + '°');
            insertDataToDom(cityTemp, tempData.city);
        })
        .catch(error => {
            console.log(error);
        })
}

function getCurrentTime() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    insertDataToDom(timeHours, hours)
    insertDataToDom(timeMins, minutes)

    setGreetingTime(hours);
}

function setGreetingTime(hours) {
    if (hours >= 0 && hours < 12) {
        insertDataToDom(greetTime, 'morning');
    } else if (hours >= 12 && hours < 18) {
        insertDataToDom(greetTime, 'afternoon');
    } else {
        insertDataToDom(greetTime, 'evening');
    }
}

// quote of the day
let quoteOfTheDay = fetch('https://api.quotable.io/random');

quoteOfTheDay.then(response => response.json())
    .then(response => {
        let quoteReceived = {
            'quote': response.content,
            'author': response.author,
        }
        insertDataToDom(quoteText, quoteReceived.quote);
        insertDataToDom(quoteAuthor, quoteReceived.author);
    })

    .catch(error => {
        console.log(error);
    })

// inspire me again button
reloadPage();

// universal methods
let tempRounded = function (tempValue) {
    return Math.round(tempValue);
}

function insertDataToDom(htmlElem, dataToInsert) {
    htmlElem.innerText = dataToInsert;
}

function reloadPage() {
    getInspired.addEventListener('click', function () {
        location.reload();
    })
}