
import React, { Component } from 'react';
import Card from './Card';

export default class CardGallery extends Component {


	renderCards = () => {
		return this.props.cardPool.map((card) => {
			return (
			<Card 
				picture={card.picture}
				type={card.type}
				selectCard={this.props.selectCard}
				selectedCard={this.props.selectedCard}
			/>
			);
		});
	}

	render(){
		return(
			<div id="card-gallery">
				{this.renderCards()}
			</div>
		)
	}


}