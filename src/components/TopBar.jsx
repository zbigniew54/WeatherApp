import Button from './Button'; 

import { showModule } from '../utils.js'; 
// ............................................................................
// show/hide search module
function toggleSearch( searchModuleDOM ){  
    showModule( searchModuleDOM, searchModuleDOM.classList.contains('hidden') )
} 
// ............................................................................
// Creates top bar (header)
// PROPS:
// appName
// searchModule - DOM handle to search module
export default function TopBar({ appName, searchModuleRef })
{
    // console.log('TopBar searchModuleRef.current',searchModuleRef.current)
    return(
    <header>
        <div className="container">
            <div className="logo">
                <img src="assets/icons/logo.svg" alt={ appName +' logo' } /> 
                { appName }
            </div> 

            <Button 
                label="Add city" 
                icon="add_circle" 
                onClick={ searchModuleRef? (e)=>{ toggleSearch( searchModuleRef.current ) } :null }
            />

        </div>
    </header>
    )
}