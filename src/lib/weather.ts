import { WeatherData } from "@/store/reducers/location";

export const translateDescription = (description: string): string => {
  switch (description) {
    case "clear sky":
      return "Céu limpo";
    case "few clouds":
      return "Poucas nuvens";
    case "scattered clouds":
      return "Nuvens dispersas";
    case "broken clouds":
      return "Nuvens quebradas";
    case "overcast clouds":
      return "Nublado";
    case "light rain":
      return "Chuva fraca";
    case "moderate rain":
      return "Chuva moderada";
    case "heavy intensity rain":
      return "Chuva intensa";
    case "very heavy rain":
      return "Chuva muito intensa";
    case "extreme rain":
      return "Chuva extrema";
    case "freezing rain":
      return "Chuva congelante";
    case "light snow":
      return "Neve fraca";
    case "snow":
      return "Neve";
    case "heavy snow":
      return "Neve pesada";
    case "sleet":
      return "Aguaceiro de neve";
    case "shower rain":
      return "Chuva de banho";
    case "light intensity shower rain":
      return "Chuva leve";
    case "shower snow":
      return "Neve chuvosa";
    case "mist":
      return "Nevoeiro";
    default:
      return description;
  }
};

export const getLocationAndWeather = (): Promise<WeatherData> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=93c14486890b0ebb887e0add8cf0b9e2`
        )
          .then((response) => response.json())
          .then((data) => {
            const city = data.name;
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const translatedDescription = translateDescription(description);
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            // Construct weather object
            const weatherData = {
              city: city,
              temperature: parseInt(temperature),
              description: translatedDescription,
              icon: iconUrl,
            };

            resolve(weatherData);
          })
          .catch((error) => {
            reject(error);
          });
      });
    } else {
      reject(new Error("Geolocation is not supported in this browser."));
    }
  });
};
