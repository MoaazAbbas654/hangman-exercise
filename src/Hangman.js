import React, { Component } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [{img:img0, descrition:'0/6'}, {img :img1, descrition: '1/6'}, {img: img2, descrition: '2/6'}, {img: img3, descrition: '3/6'}, {img: img4, descrition: '4/6'}, {img: img5, descrition: '5/6'}, {img: img6, descrition:'6/6'}]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord ()};
    this.handleGuess = this.handleGuess.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? (ltr) : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  restart(){
    this.setState(st => (
      st = {nWrong: 0, guessed: new Set(), answer: randomWord ()}
    ))
  }

  handleClick(){
    this.restart()
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, idx) => (
      <button
        key={idx}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img alt={this.props.images[this.state.nWrong].descrition} src={this.props.images[this.state.nWrong].img} />
        {this.state.nWrong === 6?  
        <div>
          <h1>YOU LOSE</h1>
          <p>The word was {this.state.answer}</p>
          <button className='restart-btn' onClick= {this.handleClick}>Restart</button>
        </div> 
        : 
        <div>
        <p>Number of wrong guesses are: {this.state.nWrong}</p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p className='Hangman-btns'>{this.generateButtons()}</p>
        <button className='restart-btn' onClick= {this.handleClick}>Restart</button>
        </div>}
      </div>
    );
  }
}

export default Hangman;
