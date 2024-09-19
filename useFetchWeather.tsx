import { useState, useEffect } from 'react';

const useFetchWeather = (api: string, apiKey: string, city: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `${api}${city}&appid=${apiKey}`;

  //console.log("HHHHIII from fetch", city)

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          // error coming back from server
          throw new Error('Could not fetch the data for that resource');
        }
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { data, isLoading, error };
};

export default useFetchWeather;
