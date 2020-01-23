// Importing Dependencies
import React, { Component } from 'react';
import Card from '../components/Card';

// Importing Styling
import './Landing.css';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			card_pool: [],
			deck: [],
			result: '',
			rank: [
				{
					// 10 J Q K A all in the same suit
					name: 'Royal Flush',
					function: function(hand) {
						console.log('Checking for Royal Flush');
						if (hand.flush) {

                        } else {
                            console.log('None');
							return false;
						}
					},
				},
				{
					// Five cards in a row, all in the same suit
					name: 'Straight Flush',
					function: function(hand) {
						console.log('Checking for Straight Flush');
						if (hand.flush) {

                        } else {
                            console.log('None');
							return false;
						}
					},
				},
				{
					// The same card in each of the four suits
					name: 'Four of a Kind',
					function: function(hand) {
						console.log('Checking for Four of a Kind');
						if (hand.four > 0) {
							return 'Four of a Kind';
						} else {
                            console.log('None');
							return false;
						}
					},
				},
				{
					// A pair plus three of a kind
					name: 'Full House',
					function: function(hand) {
						console.log('Checking for Full House');
						if (hand.three > 0 && hand.two > 0) {
							return 'Full House';
						} else {
                            console.log('None');
							return false;
						}
					},
				},
				{
					// Five cards in on suit but not in numerical order
					name: 'Flush',
					function: function(hand) {
						console.log('Checking for Flush');
						if (hand.flush) {
							return 'Flush';
						} else {
                            console.log('None');
							return false;
						}
					},
				},
				{
					// Five cards in numberical order, but not in the same suit
					name: 'Straight',
					function: function(hand) {
                        console.log('Checking for Straight');
                        if (false) {
                            
                        } else {
                            console.log('None');
                            return false
                        }
					},
				},
				{
					// Three of one card and two non-paired cards
					name: 'Three of a Kind',
					function: function(hand) {
						console.log('Checking for Three of a Kind');
						if (hand.three > 0) {
							return 'Three of a Kind';
						} else {
                            console.log('None');
							return false;
						}
					},
				},
				{
					// Two pairs
					name: 'Two Pair',
					function: function(hand) {
						console.log('Checking for Two Pair');
						if (hand.two > 1) {
							return 'Two Pair';
						} else {
                            console.log('None');
							return false;
						}
					},
				},
				{
					// One Pair
					name: 'One Pair',
					function: function(hand) {
						console.log('Checking for One Pair');
						if (hand.two > 0) {
							return 'One Pair';
						} else {
                            console.log('None');
							return false;
						}
					},
				},
				{
					// No matching cards
					name: 'High Card',
					function: function(hand) {
						console.log('Checking for High Card');
						return 'High Card';
					},
				},
			],
		};
	}

	// generate 52 cards
	generate_cards = () => {
		let cards = [];
		let suit = ['C', 'D', 'H', 'S'];
		let values = ['A', 'K', 'Q', 'J', 'T', 9, 8, 7, 6, 5, 4, 3, 2];
		for (let i = 0; i < suit.length; i++) {
			for (let j = 0; j < values.length; j++) {
				cards.push(values[j] + suit[i]);
			}
		}
		return cards;
	};

	// shuffle the deck and add it to state
	shuffle_deck = array => {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		this.setState({
			deck: array,
		});
	};

	componentDidMount() {
		let cards = this.generate_cards();
		this.setState(
			{
				card_pool: cards,
			},
			() => {
				console.log(this.state.card_pool);
				this.shuffle_deck(this.state.card_pool);
			}
		);
	}

	render() {
		const render_hand = card => {
			return <Card card={card} key={card}/>;
		};

		const draw_cards = () => {
            console.clear();
			let cards = [];
			let card_number = Math.floor(Math.random() * Math.floor(35) + 5);

			for (let i = 0; i < card_number; i++) {
				cards.push(this.state.deck[i]);
			}


			sort_hand(cards);
		};

		const sort_hand = cards_unsorted => {
			let hand = {
				C: 0,
				D: 0,
				H: 0,
				S: 0,
				two: 0,
				three: 0,
                four: 0,
                flush: false,
				cards: [],
            };
            
            // Sort cards
            hand.cards = cards_unsorted.sort();
            
            // Add card div to the page
            let card_div = hand.cards.map(render_hand);
            this.setState({
				card_div: card_div,
			});

            // Determine the number of suits and pairs
			for (let i = 0; i < hand.cards.length; i++) {

                // Tally number of suits
				switch (hand.cards[i].charAt(1)) {
					case 'C':
						hand.C++;
						break;
					case 'D':
						hand.D++;
						break;
					case 'H':
						hand.H++;
						break;
					case 'S':
						hand.S++;
						break;
					default:
						break;
				}

				// Checking for Two / Three / Four of a kind
				if (
					i + 3 < hand.cards.length &&
					hand.cards[i].charAt(0) === hand.cards[i + 1].charAt(0) &&
					hand.cards[i].charAt(0) === hand.cards[i + 2].charAt(0) &&
					hand.cards[i].charAt(0) === hand.cards[i + 3].charAt(0)
				) {
					hand.four++;
				} else if (
					i + 2 < hand.cards.length &&
					hand.cards[i].charAt(0) === hand.cards[i + 1].charAt(0) &&
					hand.cards[i].charAt(0) === hand.cards[i + 2].charAt(0)
				) {
					hand.three++;
				} else if (
					i + 1 < hand.cards.length &&
					hand.cards[i].charAt(0) === hand.cards[i + 1].charAt(0)
				) {
					hand.two++;
                }
			}

            // Check for a flush of any type
			if (hand.C > 4 || hand.D > 4 || hand.H > 4 || hand.S > 4) {
                hand.flush = true;
			}

            // Pass the sorted hand to find_highest
            find_highest(hand);
		};

		// Goes top down through the rankings to determine the highest hand
		const find_highest = hand => {
			for (let i = 0; i < this.state.rank.length; i++) {
				let result = this.state.rank[i].function(hand);
				if (result) {
					this.setState({
						result: result,
					});
					break;
				}
			}
		};

		return (
			<div className="landing">
				<div className="header">
					<div className="button">
						<button onClick={() => draw_cards()}>Draw Hand</button>
					</div>
					<div className="result">Best hand: {this.state.result}</div>
				</div>
				<div className="cards">{this.state.card_div}</div>
			</div>
		);
	}
}

export default Landing;
