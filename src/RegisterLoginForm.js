import React, { Component } from 'react';

export default class RegisterLoginForm extends Component {

  constructor(props) {

    super(props);

    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    };
  }

  getInput(id, type, label, value, onChange, onBlur = null) {

    return (
      <React.Fragment>
        <span>{label}</span>
        <input id={id} type={type} value={value} onChange={onChange} onBlur={onBlur}/>
      </React.Fragment>
    );
  }

  render() {

    const { mode } = this.props;
    const { username, password, errorMessage } = this.state;

    return (
      <React.Fragment>
        {this.getInput('username', 'text', 'Username:', username, this.validateUsernameOnChange)}
        <br/>
        {this.getInput('password', 'password', 'Password:', password, this.validatePassword, this.validatePasswordOnBlur)}
        {
        errorMessage ?
        <div style={{ color: 'red' }}>{errorMessage}</div>
        : null
        }
        <br/>
        {
        mode === 'register' ?
        <button onClick={this.register}>Register</button>
        : mode === 'login' ?
        <button onClick={this.login}>Login</button>
        :
        null
        }
      </React.Fragment>
    );
  }

  validateInputs() {

    const { username, password, errorMessage } = this.state;

    if (errorMessage) {
      return false;
    }

    if (username.length === 0) {
      this.setState({
        errorMessage: 'Username is empty!'
      });

      return false;
    } else if (password.length === 0) {
      this.setState({
        errorMessage: 'Password is empty!'
      });

      return false;
    } else

    return true;
  }

  register = () => {

    const { username, password } = this.state;
    const { localStorage } = window;

    if (this.validateInputs()) {

      if (localStorage.getItem(username)) {
        this.setState({
          errorMessage: 'Username already exists!'
        });
      } else {
        localStorage.setItem(username, password);

        this.props.onAuthenticate(username);
      }
    }
  }

  login = () => {

    const { username, password } = this.state;
    const { localStorage } = window;

    if (this.validateInputs()) {
      if (localStorage.getItem(username) !== password) {
        this.setState({
          errorMessage: 'Invalid login data!'
        });
      } else {
        localStorage.setItem(username, password);

        this.props.onAuthenticate(username);
      }
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