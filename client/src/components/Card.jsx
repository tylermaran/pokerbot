import React from 'react';

import './Card.css';

const Card = props => {
	let style;

	let current_card = [...props.card];
	switch (current_card[1]) {
		case 'C':
            style = {color: 'black'};
            current_card[1] = <span>&clubs;</span>;
			break;
		case 'D':
            style = {color: 'red'};
            current_card[1] = <span>&diams;</span>;
			break;
		case 'H':
            style = {color: 'red'};
            current_card[1] = <span>&hearts;</span>;
			break;
		case 'S':
            style = {color: 'black'};
            current_card[1] = <span>&spades;</span>;
			break;
		default:
			break;
	}

	switch (current_card[0]) {
		case 11:
            current_card[0] = 'J';
			break;
		case 12:
            current_card[0] = 'Q';
			break;
		case 13:
            current_card[0] = 'K';
			break;
		case 14:
            current_card[0] = 'A';
			break;

		default:
			break;
	}
	
	return (
		<div className="card" style={style}>
			<div className="top_left">{current_card[0]}{current_card[1]}</div>
			<div className="bottom_right">{current_card[0]}{current_card[1]}</div>
		</div>
	);
};

export default Card;
