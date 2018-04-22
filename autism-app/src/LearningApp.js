import React, { Component } from 'react';
import SadPicture1 from './assets/sad1.jpg';
import SadPicture2 from './assets/sad2.jpg';
import SadPicture3 from './assets/sad3.jpg';
import SadPicture4 from './assets/sad4.jpg';
import SadPicture5 from './assets/sad5.jpg';
import HappyPicture1 from './assets/happy1.jpg';
import HappyPicture2 from './assets/happy2.jpg';
import HappyPicture3 from './assets/happy3.jpg';
import HappyPicture4 from './assets/happy4.jpg';
import HappyPicture5 from './assets/happy5.jpg';
import AngryPicture1 from './assets/angry1.jpg';
import AngryPicture2 from './assets/angry2.jpg';
import AngryPicture3 from './assets/angry3.jpg';
import AngryPicture4 from './assets/angry4.jpg';
import AngryPicture5 from './assets/angry5.jpg';
import CardGallery from './CardGallery';


export default class LearningApp extends Component {
  constructor(props){
    super(props);
    this.state = {
    	quizQuestion: null,
    	correctAnswer: null,
    	selectedCard: null,
    	isCorrect: null,
    	cardPool: [],
      progress: 0,
    };
  }


  randomizeCards = () => {
  	const happyPictures = [HappyPicture1, HappyPicture2, HappyPicture3, HappyPicture4, HappyPicture5];
  	const sadPictures = [SadPicture1, SadPicture2, SadPicture3, SadPicture4, SadPicture5];
  	const angryPictures = [AngryPicture1, AngryPicture2, AngryPicture3, AngryPicture4, AngryPicture5];
    
  	const happyPicture = {
        picture: happyPictures[Math.floor((Math.random() * happyPictures.length))], 
        type: 'happy'
    }
    const sadPicture = {
        picture: sadPictures[Math.floor((Math.random() * happyPictures.length))], 
        type: 'sad'
    } 
    const angryPicture = {
        picture: angryPictures[Math.floor((Math.random() * happyPictures.length))], 
        type: 'angry'
    }
    const pictureArray = [happyPicture, sadPicture, angryPicture];

    for (var i = pictureArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = pictureArray[i];
        pictureArray[i] = pictureArray[j];
        pictureArray[j] = temp;
    }
    this.setState({ cardPool: pictureArray });
  }

  componentWillMount(){
  	this.randomizeCards();
  	this.generateQuestion();
  }



  generateQuestion = () => {
    const randomNumber = Math.floor((Math.random() * 3) + 1); 
    if (randomNumber === 1){
      this.setState({ quizQuestion: "Select the emotion for 'Happy'", correctAnswer: 'happy', isCorrect: null});
    }
    if (randomNumber  === 2){
      this.setState({ quizQuestion: "Select the emotion for 'Sad'", correctAnswer: 'sad', isCorrect: null});
    }
    if (randomNumber === 3){
      this.setState({ quizQuestion: "Select the emotion for 'Angry'", correctAnswer: 'angry', isCorrect: null});
    }
  }

  selectCard = (card) => {
  	this.setState({
  		selectedCard: card,
  	})
  }

  checkAnswer = () => {
  	if (this.state.correctAnswer === this.state.selectedCard) {
  		this.setState({ isCorrect: true });
  	} 
  	if (this.state.correctAnswer !== this.state.selectedCard) {
  		this.setState({ isCorrect: false });
  	}
  }

  reset = () => {
  	this.generateQuestion();
  	this.randomizeCards();
  }

  renderFooter = () => {
  	const isCorrect = this.state.isCorrect;

  	if (isCorrect === null){
  		return(
        <nav className="level">
          <div className="level-left">
            <button className="button is-dark is-medium is-rounded is-outlined" onClick={this.checkAnswer}>Skip</button>
          </div>
          <div className="level-right">
            <button className="button is-success is-medium is-rounded" onClick={this.checkAnswer}>Check</button>
          </div>
        </nav>
      )
  	}
  	else if (isCorrect === true){
  		return(
        <nav style={{ backgroundColor: '#bff199' }} className="level">
          <div className="level-left">
     					<h1 class="title" style={{ color: '#23d160'}}>You are Correct!</h1>
          </div>
          <div className="level-right">
            <button className="button is-success is-medium is-rounded" onClick={this.reset}>Continue</button>
          </div>
        </nav>
      )
  	}
  	else if (isCorrect === false){
  		return(
        <nav style={{ backgroundColor: '#ffd3d1' }} className="level">
          <div className="level-left">
     					<h1 class="title" style={{ color: '#ff3860'}}>Incorrect</h1>
          </div>
          <div className="level-right">
            <button className="button is-danger is-medium is-rounded" onClick={this.reset}>Continue</button>
          </div>
        </nav>
      )
  	}
  }



  render() {
    return (
          <div className="learning-app">
            <br></br>
          	<h1 class="title is-3 ">{this.state.quizQuestion}</h1>
          	<CardGallery cardPool={this.state.cardPool} selectCard={this.selectCard} selectedCard={this.state.selectedCard} />
          	{this.renderFooter()}
          </div>
    )
  }


}

