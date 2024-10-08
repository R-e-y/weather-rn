import {useState, useEffect} from 'react';
import {Weather} from '../types/Weather';
import {createWeather} from '../utils';
import { API_KEY } from '../constants';

const useFetchWeather = (city: string[] | string, days: number) => {
  const [data, setData] = useState<Weather[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const cities = Array.isArray(city) ? city : [city];

        const fetchPromises = cities.map(async (currentCity) => {
          const url = `https://api.weatherapi.com/v1/forecast.json?days=${days.toString()}&key=${API_KEY}&q=${currentCity}&aqi=no&alerts=no`;
          const response = await fetch(url);
          if (!response.ok) {
            // error coming back from server
            throw new Error('Could not fetch the data for that resource');
          }
          const result = await response.json();
          const hasForecast = days > 1;
          return createWeather(result, hasForecast);
        })

        const weatherList: Weather[] = await Promise.all(fetchPromises)
        setData(weatherList);
        
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, days]);

  return {data, loading, error};
};

export default useFetchWeather;
