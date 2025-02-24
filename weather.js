document.querySelector('#btnWeather').addEventListener('click', function() {
    async function getWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                const strBaseURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&temperature_unit=fahrenheit`;
                
                const city = await getCityFromCoords(latitude, longitude);
                document.getElementById("weather").innerText = `Location: ${city}`;
                try {
                    const weatherResponse = await fetch(strBaseURL);
                    
                    if (!weatherResponse.ok) {
                        throw new Error(`HTTP Error Status: ${weatherResponse.status}`);
                    }

                    const weatherData = await weatherResponse.json();
                    
                    document.getElementById("temperature").innerText = `Temperature: ${weatherData.current.temperature_2m}°F`;
                    document.getElementById("humidity").innerText = `Humidity: ${weatherData.current.relative_humidity_2m}`;

                    if (weatherData.current.weather_code === 0) {
                        document.getElementById("weather").innerText = `Weather: Clear`;
                        document.getElementById("weather-icon").innerHTML = `<i class="bi bi-sun-fill" style="font-size: 75px;"></i>`;
                    } 
                    else if (weatherData.current.weather_code === 1 || weatherData.current.weather_code === 2 || weatherData.current.weather_code === 3) {
                        document.getElementById("weather").innerText = `Weather: Cloudy`;
                        document.getElementById("weather-icon").innerHTML = `<i class="bi bi-cloud-fill" style="font-size: 75px;"></i>`;
                    } 
                    else if (weatherData.current.weather_code === 61 || weatherData.current.weather_code === 63 || weatherData.current.weather_code === 65 || 
                             weatherData.current.weather_code === 66 || weatherData.current.weather_code === 67 || weatherData.current.weather_code === 80 || 
                             weatherData.current.weather_code === 81 || weatherData.current.weather_code === 82) {
                        document.getElementById("weather").innerText = `Weather: Rain`;
                        document.getElementById("weather-icon").innerHTML = `<i class="bi bi-cloud-drizzle" style="font-size: 75px;"></i>`;
                    }    
                    else if (weatherData.current.weather_code === 71 || weatherData.current.weather_code === 73 || weatherData.current.weather_code === 75 || 
                             weatherData.current.weather_code === 85 || weatherData.current.weather_code === 86 || weatherData.current.weather_code === 77) {
                        document.getElementById("weather").innerText = `Weather: Snow`;
                        document.getElementById("weather-icon").innerHTML = `<i class="bi bi-snow" style="font-size: 75px;"></i>`;
                    } 
                    else if (weatherData.current.weather_code === 45 || weatherData.current.weather_code === 48) {
                        document.getElementById("weather").innerText = `Weather: Fog`;
                        document.getElementById("weather-icon").innerHTML = `<i class="bi bi-cloud-fog" style="font-size: 75px;"></i>`;
                    } 
                    else if (weatherData.current.weather_code === 51 || weatherData.current.weather_code === 53 || weatherData.current.weather_code === 55 || 
                             weatherData.current.weather_code === 56 || weatherData.current.weather_code === 57) {
                        document.getElementById("weather").innerText = `Weather: Drizzle`;
                        document.getElementById("weather-icon").innerHTML = `<i class="bi bi-cloud-drizzle" style="font-size: 75px;"></i>`;
                    } 
                    else {
                        document.getElementById("weather").innerText = `Weather: Unknown`;
                        document.getElementById("weather-icon").innerHTML = `<i class="bi bi-question-circle" style="font-size: 75px;"></i>`;
                    }



                } catch (weatherError) {
                    console.error('Error fetching weather data', weatherError);
                    alert("Failed to fetch weather. Please check the API or try again later.");
                }
            }, function(error) {
                alert("Geolocation is required for accurate weather data. Please enable location access.");
                console.error("Geolocation error:", error);
            });
        } else {
            alert("Geolocation is not supported by your browser.");
        }


    }

   
    getWeather();
});

