import {useState, useEffect} from 'react';
import {Weather} from './types/Weather';
import {createWeather} from './utils';

const useFetchWeather = (city: string, days: number) => {
  // const useFetchWeather = (api: string, apiKey: string, city: string) => {
  const [data, setData] = useState<Weather>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let hasForecast = false

  // const url = `${api}${city}&appid=${apiKey}`;
  const url = `https://api.weatherapi.com/v1/forecast.json?days=${days.toString()}&key=${apiKey}&q=${city}&aqi=no&alerts=no`;

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          // error coming back from server
          throw new Error('Could not fetch the data for that resource');
        }
        const result = await response.json();
        days > 1 ?  hasForecast = true : null
        const weather = createWeather(result, hasForecast);
        setData(weather);

      } catch (err: any) {
        setError(err.message);
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [apiKey, city, days]);

  return {data, isLoading, error};
};

export default useFetchWeather;
