export type Weather = {
    city: string;
    localtime:string;
    description: string;
    icon:string,
    temp: number;
    feels_like: number;
    temp_min?: number; 
    temp_max?: number;  
    pressure: number;
    humidity: number;
    visibility: number;
    sunrise: string;
    sunset: string;

    hourlyForecast: Forecast [];
    dailyForecast: Forecast [];
  };

export type Forecast = {
  datetime:string;
  temp?:number | string;
  temp_min?:number;
  temp_max?:number;
  rain_prob:number;
  icon: string;
}

