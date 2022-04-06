import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendPerfil, sendToken } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };
  }

  changeInput = ({ target }) => {
    const { name, value } = target;

    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }), () => this.onChangeDisable());
  };

  onChangeDisable = () => {
    const { name, email } = this.state;
    const emailTrue = email.length > 0;
    const nameTrue = name.length > 0;

    this.setState({
      isDisable: !(emailTrue && nameTrue),
    });

    // if (emailTrue && nameTrue) {
    //   this.setState({
    //     isDisable: false,
    //   });
    // } else {
    //   this.setState({
    //     isDisable: true,
    //   });
    // }
  };

  fetchToken = async () => {
    const { tokenDispatch } = this.props;
    const urlEndPointToken = 'https://opentdb.com/api_token.php?command=request';
    const callFetchToken = await fetch(urlEndPointToken);
    const dataToken = await callFetchToken.json();

    tokenDispatch(dataToken.token);
  }

  render() {
    const { isDisable, name, email } = this.state;
    const { sendingPerfil } = this.props;
    return (
      <>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ (event) => this.changeInput(event) }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ (event) => this.changeInput(event) }
          />
        </label>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisable }
            onClick={ () => {
              this.fetchToken();
              sendingPerfil({ name, email });
            } }
          >
            Play
          </button>
        </Link>
        <Link to="/config">
          <button
            type="button"
            data-testid="btn-settings"
            // onClick={ }
          >
            Configuração
          </button>
        </Link>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenDispatch: (token) => dispatch(sendToken(token)),
  sendingPerfil: (perfil) => dispatch(sendPerfil(perfil)),
});

Login.propTypes = {
  sendingPerfil: PropTypes.func.isRequired,
  tokenDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
