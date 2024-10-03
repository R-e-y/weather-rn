import {Weather, Forecast} from './types/Weather';
export function createWeather(weatherData: any, hasForecast: boolean): Weather {
  const newWeather: Weather = {
    city: weatherData.location.name,
    localtime: weatherData.location.localtime.split(' ')[1],
    description: weatherData.current.condition.text,
    icon: `https:${weatherData.current.condition.icon}`,
    temp: Math.round(weatherData.current.temp_c),
    temp_min: Math.round(weatherData.forecast.forecastday[0].day.mintemp_c),
    temp_max: Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c),
    feels_like: weatherData.current.feelslike_c,
    pressure: weatherData.current.pressure_mb,
    humidity: weatherData.current.humidity,
    visibility: weatherData.current.vis_km,
    sunrise: weatherData.forecast.forecastday[0].astro.sunrise,
    sunset: weatherData.forecast.forecastday[0].astro.sunset,
    hourlyForecast: [],
    dailyForecast: [],
  };

  if (hasForecast) {
    newWeather.dailyForecast = weatherData.forecast.forecastday.map(
      (day: any) => ({
        datetime: day.date,
        temp_min: Math.round(day.day.mintemp_c),
        temp_max: Math.round(day.day.maxtemp_c),
        rain_prob: day.day.daily_chance_of_rain,
        icon: `https:${day.day.condition.icon}`,
      }),
    );

    const hourlyForecast = getHourlyForecast(
      weatherData.location.localtime,
      weatherData.forecast.forecastday[0],
      weatherData.forecast.forecastday[1],
    );

    newWeather.hourlyForecast = hourlyForecast.map((hour: any) => ({
      datetime: hour.time.split(' ')[1].split(':')[0],
      temp: Math.round(hour.temp_c),
      rain_prob: hour.chance_of_rain,
      icon: `https:${hour.condition.icon}`,
    }));

    newWeather.hourlyForecast = setTwilight(
      weatherData.location.localtime,
      newWeather.hourlyForecast,
      newWeather.sunrise,
      newWeather.sunset,
      weatherData.forecast.forecastday[1].astro.sunrise,
      weatherData.forecast.forecastday[1].astro.sunset,
    );

    newWeather.hourlyForecast[0].datetime = 'Now';
    newWeather.dailyForecast[0].datetime = 'Today';
  }

  return newWeather;
}

export function getWeekday(datetime: string) {
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  if (datetime !== 'Today') {
    const date = new Date(datetime);
    return weekdays[date.getDay()];
  }

  return datetime;
}

function getHourlyForecast(datetime: string, today: any, tomorrow: any) {
  const todaysHours = today.hour;
  const tomorrowsHours = tomorrow.hour;
  const currentHour = Number(datetime.split(' ')[1].split(':')[0]);

  const forecast = todaysHours
    .slice(currentHour)
    .concat(tomorrowsHours.slice(0, currentHour + 1));

  return forecast;
}

function setTwilight(
  datetime: string,
  forecast: Forecast[],
  sunriseToday: string,
  sunsetToday: string,
  sunriseTomorrow: string,
  sunsetTomorrow: string,
) {
  const today = datetime.split(' ')[0];
  const now = new Date().getTime();

  let twilight1: Forecast;
  let twilight2: Forecast;

  sunriseToday = convertTime12to24(sunriseToday);
  sunsetToday = convertTime12to24(sunsetToday);
  sunriseTomorrow = convertTime12to24(sunriseTomorrow);
  sunsetTomorrow = convertTime12to24(sunsetTomorrow);

  const sunriseTime = new Date(`${today}T${sunriseToday}`).getTime();
  const sunsetTime = new Date(`${today}T${sunriseToday}`).getTime();

  if (now < sunriseTime) {
    twilight1 = createTwilight('Sunrise', sunriseToday);
    twilight2 = createTwilight('Sunset', sunsetToday);
  } else if (now < sunsetTime) {
    twilight1 = createTwilight('Sunrise', sunriseTomorrow);
    twilight2 = createTwilight('Sunset', sunsetToday);
  } else {
    twilight1 = createTwilight('Sunrise', sunriseTomorrow);
    twilight2 = createTwilight('Sunset', sunsetTomorrow);
  }

  const twilight1Hour = forecast.find(
    hour => hour.datetime === twilight1.datetime.split(':')[0],
  );
  const twilight2Hour = forecast.find(
    hour => hour.datetime === twilight2.datetime.split(':')[0],
  );

  twilight1Hour
    ? forecast.splice(forecast.indexOf(twilight1Hour) + 1, 0, twilight1)
    : null;
  twilight2Hour
    ? forecast.splice(forecast.indexOf(twilight2Hour) + 1, 0, twilight2)
    : null;

  return forecast;
}

function createTwilight(title: string, time: string) {
  let icon: string | number;
  title === 'Sunrise'
    ? icon = require('./icons/sunrise.png')
    : icon = require('./icons/sunset.png')

  const newForecast: Forecast = {
    datetime: time,
    temp: title,
    rain_prob: 0,
    icon: icon,
  };

  return newForecast;
}

function convertTime12to24(time12h: string) {
  const [time, modifier] = time12h.split(' ');
  let hours: string | number;
  let minutes: string;

  [hours, minutes] = time.split(':');
  hours === '12' ? (hours = '00') : null;
  modifier === 'PM' ? (hours = Number(hours) + 12) : null;

  return `${hours}:${minutes}`;
}

import {WeatherColors} from './contexts/WeatherColorsContext';
import { WEATHER_COLORS } from './constants';
export function getWeatherColors(description: string): WeatherColors {

  const color = WEATHER_COLORS.find(
    weather => weather.description === description.toLowerCase()
  );

  return color
    ? {main: color.main, minor: color.minor}
    : {main: '#DFE1E6', minor: '#FFFFFF'};
}
// #F3F3F3 transparent default
