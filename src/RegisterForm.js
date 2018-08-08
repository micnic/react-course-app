import React, { Component } from 'react';

export default class RegisterForm extends Component {

  constructor(props) {

    const { username, password, errorMessage } = props;

    super(props);

    this.state = {
      errorMessage,
      username,
      password
    };
  }

  render() {

    const { username, password, errorMessage } = this.state;

    return (
      <React.Fragment>
        <span>Username:</span>
        <input id="username" type="text" value={username} onChange={this.validateUsernameOnChange}/>
        <br/>
        <span>Password:</span>
        <input id="password" type="password" value={password} onBlur={this.validatePasswordOnBlur} onChange={this.validatePassword}/>
        {
        errorMessage ?
        <div style={{ color: 'red' }}>{errorMessage}</div>
        : null
        }
        <br/>
        <button onClick={this.register}>Register</button>
      </React.Fragment>
    );
  }

  register = () => {

    const { username, password, errorMessage } = this.state;
    const { localStorage } = window;

    if (errorMessage) {
      return;
    }

    if (username.length === 0) {
      this.setState({
        errorMessage: 'Username is empty!'
      });
    } else if (password.length === 0) {
      this.setState({
        errorMessage: 'Password is empty!'
      });
    } else if (localStorage.getItem(username)) {
      this.setState({
        errorMessage: 'Username already exists!'
      });
    } else {
      localStorage.setItem(username, password);

      this.props.onRegister(true, username);
    }
  }

  validateUsernameOnChange = (event) => {

    let username = event.target.value;

    if (!/^[a-z]{0,10}$/.test(username)) {
      username = this.state.username;
    }

    this.setState({
      username,
      password: ''
    });
  }

  validatePassword = (event) => {
    this.setState({
      password: event.target.value,
      errorMessage: ''
    });
  }

  validatePasswordOnBlur = () => {

    const { password } = this.state;

    if (password.length <= 6) {
      this.setState({
        errorMessage: 'Your password is too short!'
      });
    }
  }
}