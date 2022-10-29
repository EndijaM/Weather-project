function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let currentDate = date.getDate();

  return `${hours}:${minutes} ${day}, ${month} ${currentDate} `;
}

function citySearch(city) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let apiEndPoint = "https://api.openweathermap.org/data";

  let unit = "metric";
  let apiUrl = `${apiEndPoint}/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  document.querySelector("#city-display").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

function submitAction(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  citySearch(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitAction);

citySearch("Luxembourg");

function showPosition(position) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentInfoButton = document.querySelector("#current-info");
currentInfoButton.addEventListener("click", getCurrentLocation);

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
