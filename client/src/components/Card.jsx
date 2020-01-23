import React from 'react';

import './Card.css';

const Card = props => {
    let style;
    if (props.card.charAt(1) === 'D' || props.card.charAt(1)=== 'H') {
        style = {
            color: 'red'
        }
    }
    else {
        style = {
            color: 'black'
        }
    }
    return (
        <div className="card" style={style}>
            <div className="top_left">{props.card}</div>
            <div className="bottom_right">{props.card}</div>
        </div>
    )
}

export default Card;