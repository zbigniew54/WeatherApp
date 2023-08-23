import { useRef, useState } from 'react'; 
import { showModule, fetchCityWeather } from '../utils.js'; 
import { CFG } from '../cfg.js'; 

// ............................................................................
// Remove illegal chars, other than: a-z A-Z
function sanitizeCityName( userInputCityName ){ 
    return userInputCityName.replaceAll(/[^a-zA-Z ]/g,'')
}
// ............................................................................
// search for a city
// cityNameUserInput - user input (to be sanitized)
// onSuccess - (callback): onSuccess( weatherData )
// onFail - (optional callback): onFail(errMsg)
async function search( cityNameUserInput, onSuccess, onFail )
{
    const cityName = sanitizeCityName( cityNameUserInput )
    if( cityName!=='' )
    {    
        try{
            const weatherData = await fetchCityWeather( cityName )
            if( CFG.DEBUG_MODE )
                console.log('Weather data for ['+cityName+']:', weatherData)

            // const moduleObj = new WeatherModule( moduleWeatherRoot ) 
            // moduleObj.update( weatherData ) 
  
            // hide search module
            // showSearch( false )

            onSuccess( weatherData )
        }
        catch(e){
            // alert( )
            const errMsg = `City not found: [${ cityName }]\n (use only small or big letters, no special chars)`
             
            if( CFG.DEBUG_MODE )
                console.warn( errMsg ) 
            
            if( onFail )
                onFail( errMsg )
        }
    }
}
// ............................................................................
// city search widget
// PROPS:
// title: (str) h2 text
// placeholde: (str) input.placeholder
// bindRef: (useRef) 
// onSuccess: (callback) ie onSuccess( weatherData )
// onFail: (optional callback) onFail( errMsg )
// onSearch: (optional callback) onSearch( search phrase ) -> called on search start ("submit")
export default function SearchCity({ title, placeholder, bindRef, onSuccess, onFail, onSearch })
{
    const [errorMsg,setErrorMsg] = useState('')
    // console.log('bindRef',bindRef)
    
    const cityNameInput = useRef()

    return(
    <div ref={ bindRef } className="module module__form hidden">
        <button 
            className="btn btn--icon btn--close" 
            onClick={ (e)=>{ showModule( bindRef.current, false ) } }>
            <i className="material-icons">close</i>
        </button>
        <h2>{ title }</h2>

        <form className="find-city">
            <input 
                ref={ cityNameInput }
                type="text" 
                name="search" 
                placeholder={ placeholder } />
            <button 
                onClick={(e)=>
                { 
                    e.preventDefault() 

                    if( onSearch )
                        onSearch( cityNameInput.current.value )

                    if( onSuccess )
                        search(
                            cityNameInput.current.value,
                            ( weatherData )=>{ 
                                setErrorMsg( '' )
                                onSuccess( weatherData ) 
                            },
                            (em)=>{ 
                                setErrorMsg( em ) 
                                if( onFail )
                                    onFail( em )
                            })
                }}
                type="submit">
                <i className="material-icons">search</i>
            </button>
        </form>
        <div className="search-error">{ errorMsg }</div>
    </div>
    )
}
// ............................................................................