import { useRef, useEffect } from 'react'; 
import { printTemp, getIconPath, showModule } from '../utils.js';  

const daysOfWeek = ['Niedziela','Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota' ]
// ............................................................................
// Simple component with forecast for one day
// dayName: (str) label with day name
// dayTitle: (str) onHover hint (ie date)
// weatherCode: (int) weather code (utils.js)
// weatherDescr: (str) short description of weather conditions (icon onHover hint)
// tempC: (float) temp Celcius
function DayForecast({ dayName, dayTitle, weatherCode, weatherDescr, tempC })
{
    return(
        <li>
            <span className="day" title={ dayTitle }>{ dayName }</span> 
            <img src={ getIconPath(weatherCode) } title={weatherDescr} alt={weatherDescr}/>
            <span className="temperature"><span className="temperature__value">{ printTemp(tempC) }</span>&deg;C</span>
        </li>
    )
}
// ............................................................................
// Widget with weather information for selected city
// PROPS:
// cityName: (str)
// weatherData: {...} response from weatherapi
// onClose: callback to notify this module (and its weather data) can be deleted
export default function CityModule({ weatherData, onClose })
{
    // console.log('CityModule:', weatherData)

    useEffect(()=>{ 
        showModule(thisModule.current, true )
    }, []) // once

    const thisModule = useRef()
    return(
        !weatherData? null:

        <div ref={ thisModule } className="module module__weather hidden">
            <button 
                className="btn btn--icon btn--close"
                onClick={ (e)=>{ 
                    showModule( thisModule.current, false, onClose ) 
                } }>
                <i className="material-icons">close</i>
            </button>

            <div className="weather">
                <div className="weather__icon">
                    <img 
                        title={ weatherData.current.condition.text  } 
                        src={ getIconPath( weatherData.current.condition.code ) } 
                        alt="weather icon" />
                </div>

                <div className="weather__info">
                    <div className="city">
                        <span className="city__name">{ weatherData.location.name }</span> 
                        {/* <span className="btn btn--icon"><i className="material-icons">edit</i></span> */}
                    </div>
                    <div className="temperature">
                        {/* temp degrees Celcius */}
                        <span className="temperature__value">
                            { printTemp( weatherData.current.temp_c ) }</span>&deg;C
                    </div>
                </div>

                <ul className="weather__details">
                    {/* Pressure in millibars (1 Millibar [mbar]	= 1 Hectopascal [hPa]) */}
                    <li><img src="assets/icons/pressure.svg" alt="pressure" /> <span className="pressure__value">
                        { parseInt( weatherData.current.pressure_mb,10 ) } hPa</span></li>
                    
                    {/* humidity - (int)[0:100] Humidity as percentage */}
                    <li><img src="assets/icons/humidity.svg" alt="humidity" /> <span className="humidity__value">
                        { parseInt( weatherData.current.humidity,10 ) } %</span></li>
                    
                    {/* wind_kph -> m/s */}
                    <li><img src="assets/icons/wind-speed.svg" alt="wind-speed" /> <span className="wind-speed__value">
                        { (parseFloat( weatherData.current.wind_kph ) * 1000.0 / 3600).toFixed(1) } m/s</span></li>
                </ul>

                <ul className="weather__forecast">
                {
                    weatherData.forecast.forecastday.map( ( dayWeatherData )=>
                    {
                        const date = new Date( dayWeatherData.date )
                        const dayStr = daysOfWeek[ date.getDay() ]
                            
                        return <DayForecast 
                            key={ dayWeatherData.date }
                            dayName={ dayStr ?dayStr :dayWeatherData.date  }
                            dayTitle={ dayWeatherData.date }                                    
                            weatherCode={ dayWeatherData.day.condition.code }
                            weatherDescr={ dayWeatherData.day.condition.text } 
                            tempC={ dayWeatherData.day.avgtemp_c } /> 
                    })
                }
                </ul>
            </div>
        </div>
    )
}