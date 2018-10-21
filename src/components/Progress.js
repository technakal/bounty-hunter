import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';

import '../styles/ProgressBoard.css';

function LetterBoard(props) {
  const { id, title, letters } = props;
  return (
    <div id={id}>
      <h3>{title}</h3>
      <div className="centered-container">
        {letters.split('').map(letter => (
          <div className="container-bullet-hole" key={Math.floor(Math.random() * 1000)}>
            <img
              className="bullet-hole"
              alt="bullethole icon"
              src="https://uploads.codesandbox.io/uploads/user/c87037ce-2b65-4af3-aa6f-16ff5ad41c66/2jEX-Bullet%20Hole.svg"
            />
            <p>{letter}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BulletBoard(props) {
  const { id, title } = props;
  const bullets = [];
  for (let i = props.bullets; i > 0; i--) {
    bullets.push(i);
  }
  return (
    <div id={id}>
      <h3>{title}</h3>
      <div className="centered-container">
        {bullets.map(bullet => (
          <img
            className="bullet-icon"
            alt="bullet icon"
            key={Math.random()}
            src="https://uploads.codesandbox.io/uploads/user/c87037ce-2b65-4af3-aa6f-16ff5ad41c66/AQhT-Bullet.svg"
          />
        ))}
      </div>
    </div>
  );
}

function ProgressBoard(props) {
  return (
    <div className="container progress-board">
      <h2>Hunt Progress</h2>
      <ErrorBoundary>
        <BulletBoard
          id={'bullet-container'}
          title={'Bullets Remaining'}
          bullets={props.guessesRemaining}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <LetterBoard
          id={'guessed-letters'}
          title={'The Trail So Far'}
          letters={props.guessedLetters}
        />
      </ErrorBoundary>
    </div>
  );
}

export default ProgressBoard;
