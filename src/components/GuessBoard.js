import React from 'react';
import ErrorBoundary from './ErrorBoundary';

import '../styles/GuessBoard.css';

function GuessBoard(props) {
  const { bountyEntry } = props;
  if (bountyEntry.length) {
    return (
      <ErrorBoundary>
        <div className="container guess-board">
          <h2>Current Hunt</h2>
          <div className="guess-letters">
            {bountyEntry.map(letter => (
              <span
                key={Math.random()}
                className="text-spaced">
                {letter}
              </span>
            ))}
          </div>
        </div>
      </ErrorBoundary>
    );
  } else {
    return (
      <ErrorBoundary>
        <div className="container guess-board">
          <h2>Current Hunt</h2>
          <div className="guess-letters" />
        </div>
      </ErrorBoundary>
    );
  }
}

export default GuessBoard;
