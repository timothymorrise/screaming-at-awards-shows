// DISPLAY CARD -- COMPONENT
// ==============================

import React from 'react'

// IMPORT FROM FILE -- CSS
import "./DisplayCard.css"


function DisplayCard(props) {
    let { film_name, recipient, imgUrl} = props
    return (
        <div className="display-card">
            
            <div className="display-card-image" style={{backgroundImage: `url(${imgUrl})`}}> </div>
            <h4>{recipient}</h4>
            <p> &mdash; </p>
            <h4>{film_name}</h4>
        </div>
    )
}

export default DisplayCard
