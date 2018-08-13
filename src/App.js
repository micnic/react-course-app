import React, { Component } from 'react';
import RegisterLoginForm from './RegisterLoginForm';
import List from './List';
import './App.css';

export default class App extends Component {

  state = {
    authenticated: true,
    mode: 'register',
    username: ''
  }

  render() {

    const { authenticated, mode, username } = this.state;

    const list = [{
      id: 0,
      text: '123'
    }, {
      id: 1,
      text: '456'
    }, {
      id: 2,
      text: '789'
    }];

    return (
      <React.Fragment>
        {
          authenticated ?
          <React.Fragment>
            `Hello, ${username}!`
            <List list={list}/>
          </React.Fragment>
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
