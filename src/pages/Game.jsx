import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../styles/Game.css';

const ONE_SECOND = 1000;
const TIRTY_SECONDS = 30000;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      imgSource: '',
      indexQuestion: 0,
      answers: [],
      counter: 30,
      disabledAnswer: false,
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
    this.makeCounter();
    this.disabledAnswers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.counter === 0) {
      clearInterval(this.timerID);
    }
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

      const answers = [...incorrectAnswers].map((answer, index) => (
        {
          text: answer,
          dataTestId: `wrong-answer-${index}`,
          type: 'incorrect',
          className: '',
        }
      ));
      answers.push({
        text: correctAnswer,
        dataTestId: 'correct-answer',
        type: 'correct',
        className: '',
      });

      // função baseada na idéia do site: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
      for (let index = answers.length - 1; index > 0; index -= 1) {
        // Escolhendo elemento aleatório
        const randomNumToIndex = Math.floor(Math.random() * (index + 1));
        // Reposicionando elemento
        [answers[index],
          answers[randomNumToIndex]] = [answers[randomNumToIndex], answers[index]];
      }

      this.setState({ answers });
    }
  }

  disabledAnswers = () => {
    setTimeout(() => {
      this.setState({
        disabledAnswer: true,
      });
    }, TIRTY_SECONDS);
  }

  makeCounter = () => {
    this.timerID = setInterval(() => {
      this.setState((prevState) => ({
        counter: prevState.counter - 1,
      }));
    }, ONE_SECOND);
  }

  handleClick = () => {
    const { answers } = this.state;
    const answers1 = answers.map((answer) => {
      if (answer.type === 'correct') {
        return { ...answer, className: 'correct' };
      }
      return { ...answer, className: 'incorrect' };
    });

    this.setState({ answers: answers1 });
  }

  render() {
    const { name, getScore, questions } = this.props;
    const {
      imgSource,
      indexQuestion,
      answers,
      disabledAnswer,
      counter,
    } = this.state;

    console.log(answers);
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
          <span>{ counter }</span>
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

                <section data-testid="answer-options">
                  {
                    answers.map((answer, index) => (
                      <button
                        type="button"
                        key={ index }
                        data-testid={ answer.dataTestId }
                        className={ answer.className }
                        onClick={ () => this.handleClick() }
                        disabled={ disabledAnswer }
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
