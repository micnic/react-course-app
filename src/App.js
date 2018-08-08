import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import './App.css';

export default class App extends Component {

  state = {
    authenticated: false,
    mode: 'register',
    username: '',
    password: '',
    errorMessage: ''
  }

  render() {

    const { username, password, errorMessage } = this.state;

    return (
      <React.Fragment>
        {
          this.state.authenticated ?
          `Hello, ${username}!` // 'Hello, ' + username + '!'
          :
          <RegisterForm
            username={username}
            password={password}
            errorMessage={errorMessage}
            onRegister={this.register}
            />
        }
       </React.Fragment>
    );
  }

  register = (authenticated, username) => {

    this.setState({
      authenticated,
      username
    });
  }
}
