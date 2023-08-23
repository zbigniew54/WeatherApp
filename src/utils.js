import { API_KEY } from './secret.js'; 
import { CFG } from './cfg.js'; 

// ............................................................................
// CONST
const MODULE_FADE_TIME = 500 // (int)ms

const weatherCodeToIcon ={
    default: 'clear-day.svg',           // Sunny
    1000: 'clear-day.svg',           // Sunny
    1003: 'partly-cloudy-day.svg',   // Partly cloudy
    1006: 'cloudy.svg',              // Cloudy
    1009: 'partly-cloudy-day.svg',   // Overcast

    1030: 'fog.svg',    // Mist
    1135: 'fog.svg',    // "Fog" 
    1147: 'fog.svg',    // "Freezing fog" 

    1063: 'rain.svg',   // "Patchy rain possible"
    1180: 'rain.svg',   //  "Patchy light rain"
    1183: 'rain.svg',   // "Light rain" 
    1186: 'rain.svg',   // "Moderate rain at times"  

    1189: 'rain.svg',    // code	1189 "Moderate rain" 
    1192: 'rain.svg',    // code	1192 "Heavy rain at times" 
    1195: 'rain.svg',    // code	1195 "Heavy rain" 
    1198: 'rain.svg',    // code	1198 "Light freezing rain" 
    1201: 'rain.svg',    // code	1201 "Moderate or heavy freezing rain"
    1240: 'rain.svg',    // code	1240 "Light rain shower"
    1246: 'rain.svg',    // code	1246 "Torrential rain shower"
    1243: 'rain.svg',    // code	1243 "Moderate or heavy rain shower"

    1072: 'rain.svg',    // "Patchy freezing drizzle possible"  (mżawka)
    1150: 'rain.svg',    // code	1150 "Patchy light drizzle"  
    1153: 'rain.svg',    // code	1153 "Light drizzle
    1168: 'rain.svg',    // code	1168 	"Freezing drizzle"
    1171: 'rain.svg',    // code	1171 "Heavy freezing drizzle"
 
    1066: 'snow.svg', // "Patchy snow possible" 
    1114: 'snow.svg', // code	1114 "Blowing snow" 
    1117: 'snow.svg', // code	1117 "Blizzard" 
    1210: 'snow.svg', // code	1210 "Patchy light snow" 
    1213: 'snow.svg', // code	1213 "Light snow" 
    1216: 'snow.svg', // code	1216 "Patchy moderate snow" 
    1219: 'snow.svg', // code	1219 "Moderate snow" 
    1222: 'snow.svg', // code	1222 "Patchy heavy snow" 
    1225: 'snow.svg', // code	1225 "Heavy snow"
    1255: 'snow.svg', // code	1255 "Light snow showers" 
    1258: 'snow.svg', // code	1258 "Moderate or heavy snow showers"
 
    1069: 'sleet.svg', // "Patchy sleet possible" (śnieg z deszczem) 
    1204: 'sleet.svg', // "Light sleet" 
    1207: 'sleet.svg', // "Moderate or heavy sleet"
    1249: 'sleet.svg', // "Light sleet showers"
    1252: 'sleet.svg', // "Moderate or heavy sleet showers"
 
    1087: 'thunderstorm.svg',   // code	1087 "Thundery outbreaks possible"  
    1273: 'thunderstorm.svg',   // code	1273 	"Patchy light rain with thunder" 
    1276: 'thunderstorm.svg',   // code	1276 "Moderate or heavy rain with thunder"  
    1279: 'thunderstorm.svg',   // code	1279 "Patchy light snow with thunder" 
    1282: 'thunderstorm.svg',   // code	1282 	"Moderate or heavy snow with thunder" 

    1237: 'hail.svg',    // code 1237 "Ice pellets" 
    1261: 'hail.svg',    // code 1261 "Light showers of ice pellets" 
    1264: 'hail.svg',    // code 1264 "Moderate or heavy showers of ice pellets"
}

// ............................................................................
// Show or hide module
export function showModule(module, vis=true, onHidden=null ){
    if( vis ){ 
        module.classList.remove('hidden')  
        module.style.opacity = 0.0    
        setTimeout( ()=>{ 
            module.style.opacity = 1.0 
        }, 1) 
    }
    else{ 
        module.style.opacity = 0.0
        setTimeout( ()=>{ 
            module.classList.add('hidden')
            if( onHidden )
                onHidden()
        }, MODULE_FADE_TIME) 
    }
} 
// ............................................................................
// for a given weather condition code returns icon path
export function getIconPath( wCode )
{   
    return 'assets/icons/'+(( wCode in weatherCodeToIcon )
        ?weatherCodeToIcon[wCode] 
        :weatherCodeToIcon.default)
}
// ............................................................................
// same format for temp everywhere
export function printTemp( t ){    // (float) degrees Celcius
    return parseFloat( t ).toFixed(1)
}
// ............................................................................
// fetch weather for a city
// cityCode - city name or IP address, Latitude/Longitude (decimal degree) or 'auto:ip'
export async function fetchCityWeather( cityCode='auto' )
{   
    const response = await fetch( `https://api.weatherapi.com/v1/forecast.json?key=${ API_KEY }&q=${ cityCode === 'auto'? 'auto:ip': encodeURIComponent( cityCode ) }&days=${ CFG.FORECAST_DAYS }`)
    if( !response.ok )
        throw Error( response.statusText )
    else{
        // if( CFG.DEBUG_MODE ) 
        //     console.log('fetched weather data for: '+cityCode)
        return response.json() 
    }
}
// ............................................................................
