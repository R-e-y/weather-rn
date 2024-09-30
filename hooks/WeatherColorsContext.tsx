import React, {createContext, useContext} from 'react';

export interface WeatherColors {
  main: string;
  minor: string;
}

const WeatherColorsContext = createContext<WeatherColors | null>(null);

export function useWeatherColors() {
  const context = useContext(WeatherColorsContext);

  if (!context) {
    throw new Error(
      'useWeatherColors must be used within a WeatherColorsProvider',
    );
  }

  return context;
}

export function WeatherColorsProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: WeatherColors;
}) {
  return (
    <WeatherColorsContext.Provider value={value}>
      {children}
    </WeatherColorsContext.Provider>
  );
}
