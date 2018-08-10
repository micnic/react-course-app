import React, { Component } from 'react';
import RegisterLoginForm from './RegisterLoginForm';
import './App.css';

export default class App extends Component {

  state = {
    authenticated: false,
    mode: 'register',
    username: ''
  }

  render() {

    const { authenticated, mode, username } = this.state;

    return (
      <React.Fragment>
        {
          authenticated ?
          `Hello, ${username}!` // 'Hello, ' + username + '!'
          :
          <React.Fragment>
            <RegisterLoginForm mode={mode} onAuthenticate={this.authenticate}/>
            {
              mode === 'register' ?
              <div style={{ cursor: 'pointer' }} onClick={() => { this.setState({ mode: 'login' }) }}>Go login</div>
              :
              <div style={{ cursor: 'pointer' }} onClick={() => { this.setState({ mode: 'register' }) }}>Go register</div>
            }
          </React.Fragment>
        }
       </React.Fragment>
    );
  }

  authenticate = (username) => {

    this.setState({
      authenticated: true,
      username
    });
  }
}
