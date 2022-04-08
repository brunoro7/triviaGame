import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../styles/Game.css';
import { sendAssertion, sendPlayerImg, sendScore } from '../actions';

const ONE_SECOND = 1000;
const TIRTY_SECONDS = 30000;
const difficulty = { easy: 1, medium: 2, hard: 3 };

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      imgSource: '',
      indexQuestion: 0,
      numberOne: 1,
      howManyTimesWasClicked: 0,
      answers: [],
      counter: 30,
      localScore: 0,
      disabledAnswer: false,
      nextClass: 'nextBtnHidden',
    };
  }

  async componentDidMount() {
    const { emailGravatar, dispatchPlayerImg } = this.props;
    const hash = md5(emailGravatar).toString();
    const urlGravatar = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      imgSource: urlGravatar,
    }, () => dispatchPlayerImg(urlGravatar));
    this.randomAnswers(); this.makeCounter(); this.disabledAnswers();
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
        id: 'correct',
      });
      // função baseada na idéia do site: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
      for (let index = answers.length - 1; index > 0; index -= 1) {
        const randomNumToIndex = Math.floor(Math.random() * (index + 1));
        [answers[index],
          answers[randomNumToIndex]] = [answers[randomNumToIndex], answers[index]];
      }
      this.setState({ answers });
    }
  }

  disabledAnswers = () => {
    setTimeout(() => {
      this.setState({ disabledAnswer: true, nextClass: 'nextClassHidden' });
    }, TIRTY_SECONDS);
  }

  makeCounter = () => {
    this.timerID = setInterval(() => {
      this.setState((prevState) => ({ counter: prevState.counter - 1 }));
    }, ONE_SECOND);
  }

  checkTypeAndSum = (param) => {
    const { questions, dispatchScore, dispatchAssertion } = this.props;
    const { indexQuestion, counter } = this.state;
    const baseScore = 10;
    const question = questions[indexQuestion];
    const formula = baseScore + (counter * difficulty[question.difficulty]);

    if (param.id === 'correct') {
      this.setState({ localScore: formula },
        () => {
          const { localScore, numberOne } = this.state;
          dispatchScore(localScore);
          dispatchAssertion(numberOne);
        });
    } else {
      this.setState({ localScore: 0 },
        () => {
          const { localScore } = this.state;
          dispatchScore(localScore);
        });
    }
  }

  handleClick = ({ target }) => {
    const { answers } = this.state;
    const answers1 = answers.map((answer) => {
      if (answer.type === 'correct') {
        return { ...answer, className: 'correct' };
      }
      return { ...answer, className: 'incorrect' };
    });

    this.setState({ answers: answers1, disabledAnswer: true });
    clearInterval(this.timerID);
    this.checkTypeAndSum(target);
    this.setState({ nextClass: '' });
  }

  handleNext = () => {
    const { howManyTimesWasClicked } = this.state;
    const { history } = this.props;
    const maxQuestions = 3;

    this.setState((prevState) => ({
      indexQuestion: prevState.indexQuestion + 1,
      howManyTimesWasClicked: prevState.howManyTimesWasClicked + 1,
      counter: 30,
      nextClass: 'nextBtnHidden',
      disabledAnswer: false,
    }), () => {
      this.randomAnswers();
    });
    if (howManyTimesWasClicked > maxQuestions) {
      history.push('/feedback');
    }
  }

  render() {
    const { name, getScore, questions } = this.props;
    const { imgSource, indexQuestion, answers, disabledAnswer, counter, nextClass,
    } = this.state;

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
                        id={ answer.id }
                        key={ index }
                        data-testid={ answer.dataTestId }
                        className={ answer.className }
                        onClick={ ({ target }) => this.handleClick({ target }) }
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
          <button
            className={ nextClass }
            type="button"
            data-testid="btn-next"
            onClick={ () => this.handleNext() }
          >
            Next
          </button>
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
  dispatchScore: PropTypes.func.isRequired,
  dispatchAssertion: PropTypes.func.isRequired,
  dispatchPlayerImg: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = (state) => ({
  name: state.player.name,
  emailGravatar: state.player.gravatarEmail,
  assertions: state.player.assertions,
  getScore: state.player.score,
  tokenTrivia: state.token,
  questions: state.triviaApi.questions,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (param) => dispatch(sendScore(param)),
  dispatchAssertion: (assert) => dispatch(sendAssertion(assert)),
  dispatchPlayerImg: (imgsrc) => dispatch(sendPlayerImg(imgsrc)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);
