
//When generate weather button is clicked show weather 

document.querySelector('#btnWeather').addEventListener('click', function() {

    //getWeather()
    //Shows weather of current location

    async function getWeather() {

        //pull location from browser
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                //get location into api
                const strBaseURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&temperature_unit=fahrenheit`;
                
                //fetch weather data from api
                try {
                    const weatherResponse = await fetch(strBaseURL);
                    
                    if (!weatherResponse.ok) {
                        throw new Error(`HTTP Error Status: ${weatherResponse.status}`);
                    }

                    const weatherData = await weatherResponse.json();

                    //set weather humidity and location to respected values
                    
                    document.getElementById("temperature").innerText = `Temperature: ${weatherData.current.temperature_2m}°F`;
                    document.getElementById("humidity").innerText = `Humidity: ${weatherData.current.relative_humidity_2m}`;
                    getCity(latitude, longitude);

                    //show icon based on weather
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

                    //catch error

                } catch (weatherError) {
                    console.error('Error fetching weather data', weatherError);
                    alert("Failed to fetch weather. Please check the API or try again later.");
                }

                //if geolocation is not used
            }, function(error) {
                alert("Geolocation is required for accurate weather data. Please enable location access.");
                console.error("Geolocation error:", error);
            });
        } else {
            alert("Geolocation is not supported by your browser.");
        }


    }

   // call getweather
    getWeather();
});

//getcity()
//used to retrieve city location from given latitude and longitude

async function getCity(latitude, longitude) {

    //fetch city location based on coordinates
    const cityCords = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=d7cd239c092346dfa9a462b0c180753d`;

    try{
        const cityResponse = await fetch(cityCords)

        if(!cityResponse.ok){
            throw new Error(`HTTP Error Status: ${cityResponse.status}`);
        }

        const cityData = await cityResponse.json()

        //ASSISTED BY ChatGPT
        //I used AI to help me decipher the JSON given by geoapify because I was confused on how it looked
        //Access the features section of json, then read in different values for location
        const [firstFeature] = cityData.features;

        const locationName = firstFeature.properties.city || firstFeature.properties.town || firstFeature.properties.village || "Unknown location";
        document.getElementById("location").innerText = `Location: ${locationName}`;

    } catch (locationError) {
        console.error('Error fetching weather data', locationError);
        alert("Failed to fetch location. Please check the API or try again later.");
    }
}

