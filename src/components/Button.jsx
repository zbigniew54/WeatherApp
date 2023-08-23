// Creates top bar (header)
// PROPS:
// label: (str) text in button
// icon: (str) material name ie "add_circle"
// onClick: on click callback -> onClick(event)
export default function Button({ label, icon, onClick })
{
    return(
        <button className="btn" onClick={ onClick }>
            { label } 
            <i className="material-icons">{ icon }</i>
        </button>
    )
}