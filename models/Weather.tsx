export type Weather = {
    city: string;
    localtime:string;
    rain_prob: number;
    description: string;
    icon:string,
    temp: number;
    feels_like: number;
    temp_min?: number; 
    temp_max?: number;  
    pressure: number;
    humidity: number;
    visibility: number;
    sunrise: number;
    sunset: number;

    hourly_f?: Forecast [];
    daily_f?: Forecast [];
  };

export type Forecast = {
  datetime:number;
  temp?:number;
  temp_min?:number;
  temp_max?:number;
  rain_prob:number;
  icon: string;
}


export default function createWeather(
  weatherData: any,
  hasForecast: boolean,
): Weather {

  const newWeather: Weather = {
    city: weatherData.location.name,
    localtime:weatherData.location.localtime,
    rain_prob: weatherData.forecast.forecastday[0].day.daily_chance_of_rain,
    description: weatherData.current.condition.text,
    icon: weatherData.current.condition.icon,
    temp: weatherData.current.temp_c,
    temp_min: weatherData.forecast.forecastday[0].day.mintemp_c,
    temp_max: weatherData.forecast.forecastday[0].day.maxtemp_c,
    feels_like: weatherData.current.feelslike_c,
    pressure: weatherData.current.pressure_mb,
    humidity: weatherData.current.humidity,
    visibility: weatherData.current.vis_km,
    sunrise: weatherData.forecast.forecastday[0].astro.sunrise,
    sunset: weatherData.forecast.forecastday[0].astro.sunset,

    hourly_f: [],
    daily_f: [],
  }

  if (hasForecast){
    newWeather.daily_f = weatherData.forecast.forecastday.map((day:any) => ({
      datetime:day.date,
      temp_min:day.day.mintemp_c,
      temp_max:day.day.maxtemp_c,
      rain_prob:day.day.daily_chance_of_rain,
      icon: day.day.condition.icon,
    }))


    newWeather.hourly_f = weatherData.forecast.forecastday[0].hour.map((hour:any) => ({
      datetime:hour.time,
      temp:hour.temp_c,
      rain_prob:hour.chance_of_rain,
      icon: hour.condition.icon,
    }))
  }

  return newWeather;
}
