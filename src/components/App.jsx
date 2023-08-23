
import { useRef, useEffect, useState } from 'react'; 
import TopBar from './TopBar'; 
import SearchCity from './SearchCity'; 
import CityModule from './CityModule'; 
import Loading from './Loading';  

import {CFG} from '../cfg.js'; 
import { fetchCityWeather } from '../utils.js'; 
 
// ............................................................................
// removes duplicated cities (overwrites with new data)
// adds new cities to top
// fetches new data every serach (no buffering)
export default function App()
{
    const defaultCity = 'auto'  // cur city based on IP
    const searchModuleRef = useRef()
    const [isLoading,setIsLoading] = useState(false)
   
    // { cityName: weatherDataObj, ... }
    const [citiesWeatherData, setCitiesWeatherData] = useState({})
  
    useEffect( ()=>{  
        (async()=>{
            const wd = await fetchCityWeather( defaultCity ) 
            setCitiesWeatherData({ [wd.location.name]: wd, ...citiesWeatherData })
        })()
    },[]) // once
    
    return(
    <>
        <TopBar 
            appName={ CFG.APP_NAME } 
            searchModuleRef={ searchModuleRef } />

        <section id="app" className="container">
 
            <SearchCity 
                bindRef={ searchModuleRef } 
                title="Find city" 
                placeholder="ie. Wroclaw" 
                onSearch={ ()=>{ setIsLoading(true)  }}
                onFail={ ()=>{ setIsLoading(false) }}
                onSuccess={ ( weatherData )=>
                {  
                    setIsLoading(false)
                    if( weatherData.location.name in citiesWeatherData )
                        delete citiesWeatherData[ weatherData.location.name ]
                    setCitiesWeatherData({ [weatherData.location.name]: weatherData, ...citiesWeatherData })
                } }
            />
            { 
                Object.entries( citiesWeatherData ).map( 
                    ([cityName, cityWeatherData]) =>
                        <CityModule 
                            key={ cityName } 
                            weatherData={ cityWeatherData }
                            onClose={ ()=>{ 
                                delete citiesWeatherData[ cityName ]
                                setCitiesWeatherData({ ...citiesWeatherData })
                            } } 
                        /> 
                )
            }

            { isLoading ?<Loading /> :null   }
            
        </section>
    </>
    )
}