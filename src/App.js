import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from './pages/Login';
import Config from './pages/Config';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
// import logo from './trivia.png';
import './styles/App.css';
import Feedback from './pages/Feedback';

class App extends Component {
  render() {
    const { isFetched } = this.props;

    return (
      <div className="App">

        {/* <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header> */}
        <Switch>
          <Route exact path="/">
            {!isFetched ? <Login /> : <Redirect to="/game" />}
          </Route>
          <Route path="/game" component={ Game } />
          <Route exact path="/config" component={ Config } />
          <Route exact path="/ranking" component={ Ranking } />
          <Route exact path="/feedback" component={ Feedback } />
        </Switch>
        {/* <footer>
          Alexandre Aqui [x] Will aqui [x] joão aqui [x] Isabela aqui [x]
          Letícia aqui [x] Bruno Ro7 aqui
        </footer> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetched: state.triviaApi.isFetched,
});

App.propTypes = {
  isFetched: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
