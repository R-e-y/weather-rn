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
    twilight1 = createForecast('Sunrise', sunriseToday);
    twilight2 = createForecast('Sunset', sunsetToday);
  } else if (now < sunsetTime) {
    twilight1 = createForecast('Sunrise', sunriseTomorrow);
    twilight2 = createForecast('Sunset', sunsetToday);
  } else {
    twilight1 = createForecast('Sunrise', sunriseTomorrow);
    twilight2 = createForecast('Sunset', sunsetTomorrow);
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

function createForecast(title: string, time: string) {
  let icon: string;
  title === 'Sunrise'
    ? (icon = 'file:///Users/sd-005/new_rn_project/icons/sunrise.png')
    : (icon = 'file:///Users/sd-005/new_rn_project/icons/sunset.png');

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

import {WeatherColors} from './hooks/WeatherColorsContext';
export function getWeatherColors(description: string): WeatherColors {

  const weatherColors = [
    { description: 'sunny', main: '#FFD700', minor: '#FFE066' },  
    { description: 'clear', main: '#4A90E2', minor: '#A9A9E0' },                    
    { description: 'partly cloudy', main: '#B0C4DE', minor: '#F0F8FF' },             
    { description: 'cloudy', main: '#A9A9A9', minor: '#D3D3D3' },                    
    { description: 'overcast', main: '#778899', minor: '#C0C0C0' },                  
    { description: 'mist', main: '#B0E0E6', minor: '#E6E6FA' },                      
    { description: 'patchy rain possible', main: '#87CEEB', minor: '#B0E0E6' },      
    { description: 'patchy snow possible', main: '#E0FFFF', minor: '#F0F8FF' },      
    { description: 'patchy sleet possible', main: '#A4DDED', minor: '#B0E0E6' },     
    { description: 'patchy freezing drizzle possible', main: '#C0C0C0', minor: '#E6E6FA' },  
    { description: 'thundery outbreaks possible', main: '#708090', minor: '#778899' }, 
    { description: 'blowing snow', main: '#D3D3D3', minor: '#FFFFFF' },              
    { description: 'blizzard', main: '#A9A9A9', minor: '#F0F8FF' },                  
    { description: 'fog', main: '#CFCFCF', minor: '#F5F5F5' },                       
    { description: 'freezing fog', main: '#D1D2D3', minor: '#E6E6FA' },              
    { description: 'patchy light drizzle', main: '#B0E0E6', minor: '#F0F8FF' },      
    { description: 'light drizzle', main: '#ADD8E6', minor: '#E0FFFF' },             
    { description: 'freezing drizzle', main: '#C0C0C0', minor: '#F8F8FF' },          
    { description: 'heavy freezing drizzle', main: '#708090', minor: '#C0C0C0' },    
    { description: 'patchy light rain', main: '#87CEFA', minor: '#E0FFFF' },         
    { description: 'light rain', main: '#ADD8E6', minor: '#B0E0E6' },                
    { description: 'moderate rain at times', main: '#4682B4', minor: '#87CEFA' },    
    { description: 'moderate rain', main: '#4169E1', minor: '#B0C4DE' },             
    { description: 'heavy rain at times', main: '#27408B', minor: '#4682B4' },       
    { description: 'heavy rain', main: '#1C1C8B', minor: '#27408B' },                
    { description: 'light freezing rain', main: '#ADD8E6', minor: '#E0FFFF' },       
    { description: 'moderate or heavy freezing rain', main: '#778899', minor: '#A9A9A9' },  
    { description: 'light sleet', main: '#D3D3D3', minor: '#F0F8FF' },               
    { description: 'moderate or heavy sleet', main: '#778899', minor: '#A9A9A9' },   
    { description: 'patchy light snow', main: '#E0FFFF', minor: '#F5F5F5' },         
    { description: 'light snow', main: '#D3D3D3', minor: '#FFFFFF' },                
    { description: 'patchy moderate snow', main: '#A9A9A9', minor: '#F0F8FF' },      
    { description: 'moderate snow', main: '#B0C4DE', minor: '#D3D3D3' },             
    { description: 'patchy heavy snow', main: '#778899', minor: '#A9A9A9' },         
    { description: 'heavy snow', main: '#708090', minor: '#C0C0C0' },                
    { description: 'ice pellets', main: '#ADD8E6', minor: '#E0FFFF' },               
    { description: 'light rain shower', main: '#87CEFA', minor: '#E0FFFF' },         
    { description: 'moderate or heavy rain shower', main: '#4682B4', minor: '#87CEFA' },  
    { description: 'torrential rain shower', main: '#1C1C8B', minor: '#27408B' },    
    { description: 'light sleet showers', main: '#D3D3D3', minor: '#F0F8FF' },       
    { description: 'moderate or heavy sleet showers', main: '#778899', minor: '#A9A9A9' }, 
    { description: 'light snow showers', main: '#E0FFFF', minor: '#F5F5F5' },       
    { description: 'moderate or heavy snow showers', main: '#708090', minor: '#A9A9A9' },  
    { description: 'light showers of ice pellets', main: '#ADD8E6', minor: '#E0FFFF' }, 
    { description: 'moderate or heavy showers of ice pellets', main: '#1E90FF', minor: '#4682B4' },  
    { description: 'patchy light rain with thunder', main: '#4682B4', minor: '#87CEFA' }, 
    { description: 'moderate or heavy rain with thunder', main: '#27408B', minor: '#4682B4' },  
    { description: 'patchy light snow with thunder', main: '#778899', minor: '#B0C4DE' },
    { description: 'moderate or heavy snow with thunder', main: '#708090', minor: '#A9A9A9' },  
  ];
  

  const color = weatherColors.find(
    weather => weather.description === description.toLowerCase()
  );

  return color
    ? {main: color.main, minor: color.minor}
    : {main: '#DFE1E6', minor: '#FFFFFF'};
}
// #F3F3F3 transparent default
