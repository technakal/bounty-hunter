import React from 'react';
import ErrorBoundary from './ErrorBoundary';

import '../styles/BountyBoard.css';

function Stats(props) {
  const { record } = props;
  return (
    <div className="stats">
      <p>
        Bounties Caught: {record.win}
      </p>
      <p>
        Still at Large: {record.loss}
      </p>
    </div>
  );
}

function BountyHistory(props) {
  const { bounties } = props;
  let display = [];
  let future = [];
  if (bounties.length) {
    bounties.forEach(bounty => {
      if (
        bounty.display === 'history'
      ) {
        display.push(bounty);
      } else if (
        bounty.display === 'recent'
      ) {
        future.push(bounty);
      }
    });
  }
  if (display.length) {
    return (
      <div className="historical-bounty">
        <h3>Bounty Record</h3>
        <div className="bounty-posters">
          {display
            .reverse()
            .map(bounty => (
              <div
                key={Math.floor(
                  Math.random() * 1000
                )}
                className="bounty-poster old">
                <p>{bounty.name}</p>
                <img
                  className="poster-img"
                  alt={bounty.name}
                  src="https://uploads.codesandbox.io/uploads/user/c87037ce-2b65-4af3-aa6f-16ff5ad41c66/CeQ1-Mysterious%20Outlaw.svg"
                />{' '}
                <p>
                  {bounty.caught
                    ? 'Hanged'
                    : 'Escaped'}
                </p>
              </div>
            ))}
        </div>
      </div>
    );
  } else if (future.length) {
    return (
      <div className="historical-bounty">
        <h3>Bounty Record</h3>
        <p>One on the line.</p>
      </div>
    );
  } else {
    return (
      <div className="historical-bounty">
        <h3>Bounty Record</h3>
        <p>Still in pursuit.</p>
      </div>
    );
  }
}

function NewBounty(props) {
  const { bounties } = props;
  let display = [];
  if (bounties.length) {
    bounties.forEach(bounty => {
      if (bounty.display === 'recent') {
        display.push(bounty);
      }
    });
  }
  if (display.length) {
    return (
      <div className="recent-bounty">
        <h3>Recent Bounty</h3>
        {display.map(bounty => (
          <div
            key={Math.floor(
              Math.random() * 1000
            )}
            className="bounty-poster">
            <p>{bounty.name}</p>
            <img
              className="poster-img"
              alt={bounty.name}
              src="https://uploads.codesandbox.io/uploads/user/c87037ce-2b65-4af3-aa6f-16ff5ad41c66/CeQ1-Mysterious%20Outlaw.svg"
            />
            <p className="bounty-status">
              {bounty.caught
                ? 'Hanged'
                : 'Escaped'}
            </p>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="recent-bounty">
        <h3>On The Loose</h3>
        <div
          key={Math.floor(
            Math.random() * 1000
          )}
          className="bounty-poster">
          <p>WANTED OUTLAW</p>
          <img
            className="poster-img"
            alt="Mysterious outlaw."
            src="https://uploads.codesandbox.io/uploads/user/c87037ce-2b65-4af3-aa6f-16ff5ad41c66/CeQ1-Mysterious%20Outlaw.svg"
          />
          <p className="bounty-status">
            DEAD or ALIVE
          </p>
        </div>
      </div>
    );
  }
}

function BountyBoard(props) {
  const { record, oldBounties } = props;
  return (
    <div className="container bounty-board">
      <h2 className="title">
        Bounty Board
      </h2>
      <ErrorBoundary>
        <NewBounty
          bounties={oldBounties}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <BountyHistory
          bounties={oldBounties}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <Stats record={record} />
      </ErrorBoundary>
    </div>
  );
}

export default BountyBoard;
