import React, { Component } from 'react';

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

  render() {
    const { isDisable, name, email } = this.state;
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

        <button type="button" data-testid="btn-play" disabled={ isDisable }>
          Play
        </button>
      </>
    );
  }
}

export default Login;
