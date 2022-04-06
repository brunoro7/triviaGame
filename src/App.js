import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Config from './pages/Config';
import Game from './pages/Game';

// import logo from './trivia.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header> */}
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ Game } />
          <Route exact path="/config" component={ Config } />
        </Switch>
        {/* <footer>
          Alexandre Aqui [x] Will aqui [x] joão aqui [x] Isabela aqui [x]
          Letícia aqui [x] Bruno Ro7 aqui
        </footer> */}
      </div>
    );
  }
}

export default App;
