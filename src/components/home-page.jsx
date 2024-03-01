'use client';

import { useEffect, useState } from 'react';
import SingleCard from './single-cards';

const cardImages = [
	{ src: '/img/book.png', matched: false },
	{ src: '/img/cat.png', matched: false },
	{ src: '/img/necromancer.png', matched: false },
	{ src: '/img/potion.png', matched: false },
	{ src: '/img/skill.png', matched: false },
	{ src: '/img/witch-broom.png', matched: false },
];

const HomePage = () => {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiseOne, setChoiseOne] = useState(null);
	const [choiseTwo, setChoiseTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	// shuffle cards
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

		setChoiseOne(null);
		setChoiseTwo(null);
		setCards(shuffledCards);
		setTurns(0);
	};

	// handle a choise
	const handleChoise = (card) => {
		choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
	};

	// compare 2 selected cards
	useEffect(() => {
		if (choiseOne && choiseTwo) {
			setDisabled(true);
			if (choiseOne.src === choiseTwo.src) {
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiseOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				resetTurn();
			} else {
				setTimeout(() => resetTurn(), 1000);
			}
		}
	}, [choiseOne, choiseTwo]);

	// reset choices & increase turn
	const resetTurn = () => {
		setChoiseOne(null);
		setChoiseTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
		setDisabled(false);
	};

	// start a new game automagically
	useEffect(() => {
		shuffleCards();
	}, []);

	return (
		<main className="main">
			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New Game</button>
			<article className="card-grid">
				{cards.map((card) => (
					<SingleCard
						key={card.id}
						card={card}
						handleChoise={handleChoise}
						flipped={card === choiseOne || card === choiseTwo || card.matched}
						disabled={disabled}
					/>
				))}
			</article>
			<p>Turns: {turns}</p>
		</main>
	);
};

export default HomePage;
