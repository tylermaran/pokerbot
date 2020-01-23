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
						if (hand.royal_flush) {
						} else {
							return false;
						}
					},
				},
				{
					// Five cards in a row, all in the same suit
					name: 'Straight Flush',
					function: function(hand) {
						if (hand.straight_flush) {
							return 'Straight Flush';
						} else {
							return false;
						}
					},
				},
				{
					// The same card in each of the four suits
					name: 'Four of a Kind',
					function: function(hand) {
						if (hand.four > 0) {
							return 'Four of a Kind';
						} else {
							return false;
						}
					},
				},
				{
					// A pair plus three of a kind
					name: 'Full House',
					function: function(hand) {
						if (hand.three > 0 && hand.two > 0) {
							return 'Full House';
						} else {
							return false;
						}
					},
				},
				{
					// Five cards in one suit but not in numerical order
					name: 'Flush',
					function: function(hand) {
						if (hand.flush) {
							return 'Flush';
						} else {
							return false;
						}
					},
				},
				{
					// Five cards in numberical order, but not in the same suit
					name: 'Straight',
					function: function(hand) {
						if (hand.straight) {
							return 'Straight';
						} else {
							return false;
						}
					},
				},
				{
					// Three of one card and two non-paired cards
					name: 'Three of a Kind',
					function: function(hand) {
						if (hand.three > 0) {
							return 'Three of a Kind';
						} else {
							return false;
						}
					},
				},
				{
					// Two pairs
					name: 'Two Pair',
					function: function(hand) {
						if (hand.two > 1) {
							return 'Two Pair';
						} else {
							return false;
						}
					},
				},
				{
					// One Pair
					name: 'One Pair',
					function: function(hand) {
						if (hand.two > 0) {
							return 'One Pair';
						} else {
							return false;
						}
					},
				},
				{
					// No matching cards
					name: 'High Card',
					function: function(hand) {
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
		let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
		for (let i = 0; i < suit.length; i++) {
			for (let j = 0; j < values.length; j++) {
				cards.push([values[j], suit[i]]);
			}
		}
		return cards;
	};

	// shuffle the deck and add it to state
	shuffle_deck = card_pool => {
		let currentIndex = card_pool.length;
		let temp;
		let rand;

		while (0 !== currentIndex) {
			rand = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temp = card_pool[currentIndex];
			card_pool[currentIndex] = card_pool[rand];
			card_pool[rand] = temp;
		}

		this.setState({
			deck: card_pool,
		});
	};

	// on component mount generate cards then randomize
	componentDidMount() {
		let cards = this.generate_cards();
		this.setState(
			{
				card_pool: cards,
			},
			() => {
				this.shuffle_deck(this.state.card_pool);
			}
		);
	}

	render() {
		// Draw between 5 and 40 cards
		const draw_cards = () => {
			this.shuffle_deck(this.state.deck);
			let cards = [];
			let card_number = Math.floor(Math.random() * Math.floor(35) + 5);

			for (let i = 0; i < card_number; i++) {
				cards.push(this.state.deck[i]);
            }
            
			sort_hand(cards);
		};

		// Sort cards
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
				straight: false,
				straight_flush: false,
				royal_flush: false,
				cards: cards_unsorted,
			};

			// method to sort [1,D]
			const compare_cards = (a, b) => {
				if (a[0] < b[0]) return -1;
				if (b[0] < a[0]) return 1;
				return 0;
			};

			// Sort cards
			hand.cards = cards_unsorted.sort(compare_cards);

			// Determine the number of suits and pairs
			for (let i = 0; i < hand.cards.length; i++) {
				// Tally number of suits
				switch (hand.cards[i][1]) {
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
					hand.cards[i][0] === hand.cards[i + 1][0] &&
					hand.cards[i][0] === hand.cards[i + 2][0] &&
					hand.cards[i][0] === hand.cards[i + 3][0]
				) {
					hand.four++;
				} else if (
					i + 2 < hand.cards.length &&
					hand.cards[i][0] === hand.cards[i + 1][0] &&
					hand.cards[i][0] === hand.cards[i + 2][0]
				) {
					hand.three++;
				} else if (
					i + 1 < hand.cards.length &&
					hand.cards[i][0] === hand.cards[i + 1][0]
				) {
					hand.two++;
				}
			}

			// Check for a straight of any kind
			const checkStraight = () => {
				let temp = [];

				for (let i = 0; i < hand.cards.length; i++) {
					temp.push(hand.cards[i][0]);
				}

				temp = temp.filter((a, b) => temp.indexOf(a) === b);

				for (let j = 0; j < temp.length; j++) {
					if (j + 4 < temp.length) {
						if (
							temp[j] + 1 === temp[j + 1] &&
							temp[j] + 2 === temp[j + 2] &&
							temp[j] + 3 === temp[j + 3] &&
							temp[j] + 4 === temp[j + 4]
						) {
							hand.straight = true;
						}
					}
				}
			};
			checkStraight();

			// Check for a flush of any type
			if (hand.C > 4 || hand.D > 4 || hand.H > 4 || hand.S > 4) {
				hand.flush = true;
			}

            // If there is a possibility of a Straight Flush or Royal Flush
			if (hand.flush && hand.straight) {
				const check_straight_flush = suit => {
					let temp = [];
					for (let i = 0; i < hand.cards.length; i++) {
						if (hand.cards[i][1] === suit) {
							temp.push(hand.cards[i][0]);
						}
					}
					for (let j = 0; j < temp.length; j++) {
						if (j + 4 < temp.length) {
							if (
								temp[j] + 1 === temp[j + 1] &&
								temp[j] + 2 === temp[j + 2] &&
								temp[j] + 3 === temp[j + 3] &&
								temp[j] + 4 === temp[j + 4]
							) {
								hand.straight_flush = true;

								// Check Royal Flush
								if (
									temp[temp.length - 1] === 14 &&
									temp[temp.length - 2] === 13 &&
									temp[temp.length - 3] === 12 &&
									temp[temp.length - 4] === 11 &&
									temp[temp.length - 5] === 10
								) {
									// we got a royal flush
									hand.royal_flush = true;
									console.log('ROYAL FLUSH!!!!!!!!!!!!!!!!!');
									console.log(hand);
								}
							}
						}
					}
				};
				if (hand.C > 4) check_straight_flush('C');
				if (hand.D > 4) check_straight_flush('D');
				if (hand.H > 4) check_straight_flush('H');
				if (hand.S > 4) check_straight_flush('S');
			}

			// Pass the sorted hand to find_highest
			find_highest(hand);

			// Map cards to Card component
			const render_hand = card => {
				return <Card card={card} key={card[0] + card[1]} />;
			};

			// Add card div to the page
			let card_div = hand.cards.map(render_hand);

			this.setState({
				card_div: card_div,
			});
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
					<div className="overview">
						Generate a random number of cards (between 5 and 40) and
						determine the highest scoring hand (Royal Flush,
						Straight, Pair, etc.){' '}
					</div>
					<div className="result">Best hand: {this.state.result}</div>
					<div className="button">
						<button onClick={() => draw_cards()}>Draw Hand</button>
					</div>
				</div>
				<div className="cards">{this.state.card_div}</div>
			</div>
		);
	}
}

export default Landing;
