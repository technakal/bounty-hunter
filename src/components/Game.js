import React, {
  Component
} from 'react';
import ProgressBoard from './Progress';
import GuessBoard from './GuessBoard';
import BountyBoard from './BountyBoard';
import ErrorBoundary from './ErrorBoundary';
import { data } from '../data/bounties';

import '../styles/Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGame: true,
      bounties: [],
      usedBounties: [],
      currentBounty: [],
      bountyEntry: [],
      guessesRemaining: 0,
      guessedLetters: '',
      win: 0,
      loss: 0
    };
    this.handleClick = this.handleClick.bind(
      this
    );
    this.handleKeyPress = this.handleKeyPress.bind(
      this
    );
    this.selectBounty = this.selectBounty.bind(
      this
    );
    this.generateBountyEntry = this.generateBountyEntry.bind(
      this
    );
    this.moveToUsed = this.moveToUsed.bind(
      this
    );
    this.checkForValidInput = this.checkForValidInput.bind(
      this
    );
    this.reduceGuesses = this.reduceGuesses.bind(
      this
    );
    this.trackGuessedLetters = this.trackGuessedLetters.bind(
      this
    );
    this.compareEntryToBounty = this.compareEntryToBounty.bind(
      this
    );
    this.checkEndGame = this.checkEndGame.bind(
      this
    );
    this.processEndGame = this.processEndGame.bind(
      this
    );
    this.resetGameBoard = this.resetGameBoard.bind(
      this
    );
    this.startGame = this.startGame.bind(
      this
    );
  }

  componentWillMount() {}

  componentDidMount() {
    document.addEventListener(
      'keydown',
      this.handleKeyPress
    );
  }

  handleClick() {
    this.setState(
      {
        bounties: data,
        newGame: false
      },
      () => this.startGame()
    );
  }

  handleKeyPress(event) {
    let key = event.key;
    let valid = this.checkForValidInput(
      key
    );
    if (valid) {
      this.trackGuessedLetters(key);
      this.compareEntryToBounty(key);
    }
  }

  selectBounty() {
    let index = Math.floor(
      Math.random() *
        this.state.bounties.length
    );
    let currentBounty = this.state
      .bounties[index];
    this.moveToUsed(index);
    return currentBounty;
  }

  generateBountyEntry() {
    let bountyEntry = this.state.currentBounty.name
      .split('')
      .map(letter => {
        if (letter === ' ') {
          return letter;
        } else if (
          this.state.guessedLetters.includes(
            letter.toLowerCase()
          )
        ) {
          return letter;
        } else {
          return '_';
        }
      });

    return bountyEntry;
  }

  moveToUsed(index) {
    let usedBounties = this.state
      .usedBounties;
    usedBounties.push(
      this.state.bounties[index]
    );
    let newBounties = this.state.bounties.map(
      item => item
    );
    newBounties.splice(index, 1);
    this.setState({
      bounties: newBounties,
      usedBounties: usedBounties
    });
  }

  checkForValidInput(key) {
    let validKeys = 'abcdefghijklmnopqrstuvwxyz'.split(
      ''
    );
    return validKeys.includes(key) &&
      !this.state.guessedLetters.includes(
        key
      )
      ? true
      : false;
  }

  compareEntryToBounty(key) {
    let entry = this.generateBountyEntry();
    let guessesRemaining = entry
      .join('')
      .toLowerCase()
      .includes(key)
      ? this.state.guessesRemaining
      : this.reduceGuesses();
    this.setState({
      guessesRemaining: guessesRemaining,
      bountyEntry: entry
    });
    this.checkEndGame();
  }

  reduceGuesses() {
    return --this.state
      .guessesRemaining;
  }

  trackGuessedLetters(key) {
    this.setState(prevState => {
      return {
        guessedLetters:
          prevState.guessedLetters + key
      };
    });
  }

  checkEndGame() {
    let index = this.state.usedBounties.indexOf(
      this.state.currentBounty
    );
    if (
      this.state.currentBounty.name ===
      this.state.bountyEntry.join('')
    ) {
      this.processEndGame('win', index);
    } else if (
      !this.state.guessesRemaining
    ) {
      this.processEndGame(
        'loss',
        index
      );
    }
  }

  processEndGame(condition, index) {
    let usedBounties = this.state.usedBounties.map(
      bounty => {
        return {
          name: bounty.name,
          display: 'history',
          caught: bounty.caught
        };
      }
    );
    usedBounties[index].display =
      'recent';
    usedBounties[index].caught =
      condition == 'win' ? true : false;
    this.setState(
      {
        usedBounties: usedBounties
      },
      () =>
        this.resetGameBoard(condition)
    );
  }

  resetGameBoard(condition) {
    let nextBounty = this.selectBounty();
    this.setState({
      currentBounty: nextBounty,
      bountyEntry: nextBounty.name
        .split('')
        .map(
          letter =>
            letter === ' '
              ? letter
              : '_'
        ),
      guessesRemaining: 6,
      guessedLetters: '',
      [condition]: ++this.state[
        condition
      ]
    });
  }

  startGame() {
    let currentBounty = this.selectBounty();
    this.setState({
      currentBounty: currentBounty,
      bountyEntry: currentBounty.name
        .split('')
        .map(
          letter =>
            letter === ' '
              ? letter
              : '_'
        ),
      guessesRemaining: 6,
      guessedLetters: ''
    });
  }

  render() {
    return (
      <div className="game-board">
        <header className="header">
          <h1>Bounty Hunter</h1>
          {this.state.newGame ? (
            <button
              onClick={
                this.handleClick
              }>
              Start
            </button>
          ) : null}
        </header>
        <GuessBoard
          bountyEntry={
            this.state.bountyEntry
          }
        />
        <ProgressBoard
          guessedLetters={
            this.state.guessedLetters
          }
          guessesRemaining={
            this.state.guessesRemaining
          }
        />
        <BountyBoard
          record={{
            win: this.state.win,
            loss: this.state.loss
          }}
          oldBounties={
            this.state.usedBounties
          }
        />
      </div>
    );
  }
}

export default Game;
