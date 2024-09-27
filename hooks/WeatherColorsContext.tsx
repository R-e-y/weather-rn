import React, { createContext, useContext} from 'react'


export interface WeatherColors {
    main: string,
    minor: string
}

const WeatherColorsContext = createContext<WeatherColors | null>(null)
export default WeatherColorsContext



// export function useWeatherColors (){
//     useContext(WeatherColorsContext)
// }

// export function WeatherColorsProvider({children, value} : {children: React.ReactNode; value: object}){
//  return (
//     <WeatherColorsContext.Provider value={value}>
//         {children}
//     </WeatherColorsContext.Provider>
//  )
// }