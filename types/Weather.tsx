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
    sunrise: string;
    sunset: string;

    hourly_f: Forecast [];
    daily_f: Forecast [];
  };

export type Forecast = {
  datetime:string;
  temp?:number;
  temp_min?:number;
  temp_max?:number;
  rain_prob:number;
  icon: string;
}
