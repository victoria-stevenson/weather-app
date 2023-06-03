function getForecast(coordinates) {
  let apiKey = "5293d8454b519c30f6f6331f38c85b4c";
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let city = (document.querySelector("#current-city").innerHTML =
    response.data.name);
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  currentTemp.innerHTML = `${temperature}`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].description`);

  getForecast(response.data.coord);
}

function changeToFahrenheit(event) {
  event.preventDefault();

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureValue = (document.querySelector("#current-temp").innerHTML =
    Math.round(fahrenheitTemperature));
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function changeToCelsius(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    celsiusTemperature
  )}`;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function searchCity(city) {
  let apiKey = "b8a1f8cba14c698e101692e6302ff32f";
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiWeatherUrl);
  axios.get(apiWeatherUrl).then(showTemperature);
}
//Change City and Call Weather API
function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocationWeather(position) {
  let apiKey = "b8a1f8cba14c698e101692e6302ff32f";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiCoordUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  console.log(apiCoordUrl);
  axios.get(apiCoordUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(searchLocationWeather);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tue", "Wed", "Fri"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col weekdays frame">
          <strong>${day}</strong>
          <div class="weekday-emojis">🌦️</div>
          <span id="forecast-temp-max">23</span> <span id="forecast-temp-min">17</span>
        </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Display current day and time
let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = weekdays[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTime = document.querySelector("#date-time");
currentTime.innerHTML = `${weekday} ${hour}:${minutes}`;

let celsiusTemperature = null;

let searchField = document.querySelector("#search");
searchField.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

searchCity("Stockholm");
