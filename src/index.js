import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Game from './components/Game';

import './styles.css';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Game />
      </ErrorBoundary>
    </div>
  );
}

const rootElement = document.getElementById(
  'root'
);
ReactDOM.render(<App />, rootElement);
