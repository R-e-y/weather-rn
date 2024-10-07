import {useState, useEffect} from 'react';
import {Weather} from '../types/Weather';
import {createWeather} from '../utils';
import { API_KEY } from '../constants';

const useFetchWeather = (city: string[] | string, days: number) => {
  const [data, setData] = useState<Weather[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let hasForecast = false;

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const cities = Array.isArray(city) ? city : [city];
        const weatherList: Weather[] = [];

        for (const currenCity of cities) {
          const url = `https://api.weatherapi.com/v1/forecast.json?days=${days.toString()}&key=${API_KEY}&q=${currenCity}&aqi=no&alerts=no`;
          const response = await fetch(url);
          if (!response.ok) {
            // error coming back from server
            throw new Error('Could not fetch the data for that resource');
          }
          const result = await response.json();
          days > 1 ? (hasForecast = true) : null;
          const weather = createWeather(result, hasForecast);
          weatherList.push(weather);
        }

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
