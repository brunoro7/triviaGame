import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      imgSource: '',
      indexQuestion: 0,
      answers: [],
    };
  }

  async componentDidMount() {
    const { emailGravatar } = this.props;

    const hash = md5(emailGravatar).toString();

    const urlGravatar = `https://www.gravatar.com/avatar/${hash}`;

    this.setState({
      imgSource: urlGravatar,
    });

    this.randomAnswers();
  }

  randomAnswers = () => {
    const { indexQuestion } = this.state;
    const { questions } = this.props;
    const question = questions[indexQuestion];

    if (questions.length > 0) {
      const {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers = [],
      } = question;

      const numIncorrectAnswers = incorrectAnswers.length;
      const randomIndex = Math.floor(Math.random() * (numIncorrectAnswers));

      const answers = [...incorrectAnswers].map((answer, index) => (
        { text: answer, dataTestId: `wrong-answer-${index}` }
      ));

      const aux = answers.at(randomIndex);
      answers[randomIndex] = { text: correctAnswer, dataTestId: 'correct-answer' };
      answers.push(aux);
      console.log(answers);
      this.setState({ answers });
    }
  }

  render() {
    const { name, getScore, questions } = this.props;
    const { imgSource, indexQuestion, answers } = this.state;

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
                  {
                    answers.map((answer, index) => (
                      <button
                        type="button"
                        key={ index }
                        data-testid={ answer.dataTestId }
                      >
                        {answer.text}
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
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  emailGravatar: state.player.gravatarEmail,
  assertions: state.player.assertions,
  getScore: state.player.score,
  tokenTrivia: state.token,
  questions: state.triviaApi.questions,
});

export default connect(mapStateToProps)(Game);
