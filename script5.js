const API_KEY ="YOUR-API-KEY";

const cells = document.querySelectorAll(".cell");

async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        document.getElementById("error").textContent =
            "Please enter a city name.";
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("API response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Weather request failed");
        }

        displayWeather(data);

    } catch (error) {
        console.error("Weather error:", error);

        document.getElementById("error").textContent =
            "Error: " + error.message;
    }
}


function displayWeather(data) {

    document.getElementById("error").textContent = "";

    document.getElementById("cityName").textContent =
        data.name + ", " + data.sys.country;

    document.getElementById("temperature").textContent =
        "Temperature: " + data.main.temp + " °C";

    document.getElementById("humidity").textContent =
        "Humidity: " + data.main.humidity + " %";

    document.getElementById("wind").textContent =
        "Wind Speed: " + data.wind.speed + " m/s";

    document.getElementById("description").textContent =
        "Description: " + data.weather[0].description;
}


function getLocationWeather() {

    if (!navigator.geolocation) {

        document.getElementById("error").textContent =
            "Geolocation is not supported by your browser.";

        return;
    }

    navigator.geolocation.getCurrentPosition(
        getWeatherByLocation,
        showLocationError
    );
}


async function getWeatherByLocation(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        console.log("Location API response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Weather request failed");
        }

        displayWeather(data);

    } catch (error) {

        console.error("Location weather error:", error);

        document.getElementById("error").textContent =
            "Error: " + error.message;
    }
}


function showLocationError(error) {

    if (error.code === 1) {

        document.getElementById("error").textContent =
            "Location permission was denied.";

    } else {

        document.getElementById("error").textContent =
            "Unable to access your location.";
    }
}
