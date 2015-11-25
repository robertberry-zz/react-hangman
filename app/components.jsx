import React from 'react';
import _ from 'lodash';

const Picture = function (props) {
  const victim = [
    <circle key="1" cx="200" cy="80" r="30" />,
    <ellipse key="2" cx="200" cy="160" ry="50" rx="20" />,
    <line key="3" x1="180" x2="140" y1="140" y2="100" />,
    <line key="4" x1="220" x2="260" y1="140" y2="100" />,
    <line key="5" x1="188" x2="160" y1="200" y2="260" />,
    <line key="6" x1="212" x2="240" y1="200" y2="260" />
  ];

  return (
    <svg width="300" height="300">
      <g className="Hangman-gallows">
        <line x1="50" y1="5" x2="50" y2="290" />
        <line x1="0" y1="290" x2="100" y2="290" />
        <line x1="45" y1="5" x2="202" y2="5" />
        <line x1="50" y1="80" x2="115" y2="5" />
      </g>

      <line className="Hangman-rope" x1="200" y1="10" x2="200" y2="50" />

      <g className="Hangman-victim">
        {_.take(victim, props.incorrectGuesses)}
      </g>
    </svg>
  );
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const Puzzle = (props) => (
  <div>
    {_.map(props.word, (letter) => <span> {
      _.contains(props.guesses, letter) ? letter : '_'
    } </span>)}
  </div>
);

const Keyboard = (props) => (
  <div>
    {
      _.map(alphabet, (letter) => 
        <button onClick={() => props.guess(letter)} 
                disabled={_.contains(props.guesses, letter)}>{letter}</button>
      )
    }
  </div>
);

export class Hangman extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guesses: ['n']
    };
  }

  guess(letter) {
    this.setState({
      guesses: this.state.guesses.concat([letter])
    });
  }

  render() {
    const incorrectGuesses = _.filter(this.state.guesses, (letter) => 
      !_.contains(this.props.word, letter)
    ).length;

    return (
      <div>
        <h1>Hangman</h1>

        <Picture incorrectGuesses={incorrectGuesses} />

        <Keyboard guess={this.guess.bind(this)} guesses={this.state.guesses} />

        <Puzzle {...this.props} guesses={this.state.guesses} />
      </div>
    );
  }
};
