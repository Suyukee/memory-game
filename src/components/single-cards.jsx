const SingleCard = ({ card, handleChoise, flipped, disabled }) => {
	const handleClick = () => {
		if (!disabled) {
			handleChoise(card);
		}
	};

	return (
		<section className="card">
			<div className={flipped ? 'flipped' : ''}>
				<img className="front" src={card.src} alt="card front" />
				<img onClick={handleClick} className="back" src="/img/cover.png" alt="card back" />
			</div>
		</section>
	);
};

export default SingleCard;
