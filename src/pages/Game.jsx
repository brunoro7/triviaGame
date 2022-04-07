import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      imgSource: '',
      questions: [],
      indexQuestion: 0,
      newArray: [],
    };
  }

  async componentDidMount() {
    const { emailGravatar } = this.props;
    const hash = md5(emailGravatar).toString();

    const urlGravatar = `https://www.gravatar.com/avatar/${hash}`;

    this.triviaRequest();

    this.setState({
      imgSource: urlGravatar,
    });
  }

  triviaRequest = async () => {
    const { tokenTrivia } = this.props;
    const urlTrivia = `https://opentdb.com/api.php?amount=5&token=${tokenTrivia}`;
    const fetchTrivia = await fetch(urlTrivia);
    const apiResult = await fetchTrivia.json();

    this.setState({
      questions: apiResult.results,
    });
  }

  randomNumber = () => {
    const { questions } = this.state;
    const question = questions[indexQuestion];

    const NUMBER_4 = 4;
    let randoms = [];
    for (let i = 0; i < question.incorrect_answers.length + 1; i += 1) {
      randoms.push(Math.floor(Math.random() * (NUMBER_4)));
    }
  }

  render() {
    const { name, getScore } = this.props;
    const { imgSource, questions, indexQuestion } = this.state;

    const conditional = questions.length !== 0;
    const question = questions[indexQuestion];

    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ imgSource }
            alt={ name }
          />
          <p
            data-testid="header-player-name"
          >
            { name }
          </p>
          <p
            data-testid="header-score"
          >
            { getScore }
          </p>
        </header>

        <main>
          {
            conditional
            && (
              <div>
                <span>
                  {question.difficulty}
                </span>
                {' '}
                <span data-testid="question-category">
                  {question.category}
                </span>
                <h3 data-testid="question-text">
                  {question.question}
                </h3>

                {/* ainda falta ser aleatorio  */}
                <section data-testid="answer-options">
                  <button
                    type="button"
                    data-testid="correct-answer"
                  >
                    {question.correct_answer}
                  </button>
                  {
                    question.incorrect_answers.map((wrongAnswer, index) => (
                      <button
                        type="button"
                        key={ index }
                        data-testid={ `wrong-answer-${index}` }
                      >
                        {wrongAnswer}
                      </button>
                    ))
                  }
                </section>
              </div>
            )
          }
        </main>
      </div>
    );
  }
}

Game.propTypes = {
  emailGravatar: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  tokenTrivia: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  emailGravatar: state.player.gravatarEmail,
  assertions: state.player.assertions,
  getScore: state.player.score,
  tokenTrivia: state.token,
});

export default connect(mapStateToProps)(Game);
