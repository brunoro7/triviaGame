import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  componentDidMount() {
    this.mountLocalStorage();
  }

  mountLocalStorage = () => {
    const { imgSrc, name, score } = this.props;
    const obj = [{
      name,
      score,
      picture: imgSrc,
    }];
    localStorage.setItem('ranking', JSON.stringify(obj));
  };

  render() {
    const { imgSrc, name, score, assertions } = this.props;
    const lessThanThree = 'Could be better...';
    const threeOrMore = 'Well Done!';
    const min = 3;
    const condition = assertions < min ? lessThanThree : threeOrMore;

    return (
      <div>
        <header>
          <h1 data-testid="feedback-text">{condition}</h1>
          <img data-testid="header-profile-picture" src={ imgSrc } alt="Player Img" />
          <h2 data-testid="header-player-name">{name}</h2>
          <p data-testid="header-score">{score}</p>
        </header>
        <main>
          <h3 data-testid="feedback-total-score">{score}</h3>
          <h3 data-testid="feedback-total-question">{assertions}</h3>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  imgSrc: state.player.playerImgSrc,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
