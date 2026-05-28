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

  try {

    loading.style.display = "block";
    error.textContent = "";
    weatherCard.style.display = "none";

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    cityName.textContent =
      `${data.location.name}, ${data.location.region}, ${data.location.country}`;

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

    weatherIcon.src = data.current.condition.icon;

    // Dynamic background
    const weatherCondition = data.current.condition.text;

    if (weatherCondition.includes("Sunny")) {
      document.body.style.background =
        "linear-gradient(to right, #f6d365, #fda085)";
    }

    else if (weatherCondition.includes("Cloud")) {
      document.body.style.background =
        "linear-gradient(to right, #bdc3c7, #2c3e50)";
    }

    else if (weatherCondition.includes("Rain")) {
      document.body.style.background =
        "linear-gradient(to right, #4facfe, #00f2fe)";
    }

    else {
      document.body.style.background =
        "linear-gradient(to right, #74ebd5, #9face6)";
    }

    loading.style.display = "none";
    weatherCard.style.display = "block";

  }

  catch (err) {

    loading.style.display = "none";
    error.textContent = err.message;

  }
}

searchBtn.addEventListener("click", () => {

  const city = cityInput.value.trim();

  if (city !== "") {
    getWeather(city);
  }

});

// Press Enter to Search
cityInput.addEventListener("keypress", (event) => {

  if (event.key === "Enter") {

    getWeather(cityInput.value);

  }

});
