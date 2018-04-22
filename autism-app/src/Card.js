import React, { Component } from 'react';


export default class Card extends Component {

//this.props.type

	render(){
		let style = {};
		this.props.selectedCard === this.props.type ? style = { border: '5px solid lightGreen' } : style = {};
		return(

			<div class="flash-card">	
				<img style={style} src={this.props.picture} onClick={this.props.selectCard.bind(this,(this.props.type))} ></img>
			</div>
		)
	}


}