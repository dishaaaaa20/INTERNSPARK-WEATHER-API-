const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const time = document.getElementById("time");

const weatherIcon = document.getElementById("weatherIcon");

const apiKey = "fa2c4975b18249b29ed152318262705";

async function getWeather(city) {

  loading.style.display = "block";
  error.textContent = "";

  try {

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );

    const data = await response.json();

    console.log(data);

    if (data.error) {
      error.textContent = data.error.message;
      loading.style.display = "none";
      return;
    }

    cityName.textContent =
      `${data.location.name}, ${data.location.country}`;

    temperature.textContent =
      `🌡 Temperature: ${data.current.temp_c}°C`;

    condition.textContent =
      `☁ Condition: ${data.current.condition.text}`;

    humidity.textContent =
      `💧 Humidity: ${data.current.humidity}%`;

    wind.textContent =
      `🌬 Wind Speed: ${data.current.wind_kph} kph`;

    time.textContent =
      `🕒 Local Time: ${data.location.localtime}`;

    weatherIcon.src =
      "https:" + data.current.condition.icon;

    weatherCard.style.display = "block";

  }

  catch (err) {

    error.textContent = "Something went wrong";

    console.log(err);

  }

  loading.style.display = "none";

}

searchBtn.addEventListener("click", () => {

  const city = cityInput.value.trim();

  if (city !== "") {
    getWeather(city);
  }

});

cityInput.addEventListener("keypress", (e) => {

  if (e.key === "Enter") {

    getWeather(cityInput.value);

  }

});
