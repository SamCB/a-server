import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { LoginForm } from './components/login';
import { ErrorDialog } from './components/error';
import CircularProgress from 'material-ui/CircularProgress';

import loginAction from './actions/login';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggingIn: false,
      password: undefined,
      text: undefined,
      err: undefined
    };

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(login) {
    this.setState({
      password: login.password,
      isLoggingIn: true
    });
    loginAction(login.password)
    .then((result) => {
      this.setState({
        text: result,
        isLoggingIn: false
      });
    })
    .catch((err) => {
      this.setState({
        err: err.message,
        isLoggingIn: false
      });
    })
  }

  render() {
    const password = this.state.password;
    const isLoggingIn = this.state.isLoggingIn;
    const err = this.state.err;

    return (
      <MuiThemeProvider>
        <div>
          {password === undefined &&
            <LoginForm onSubmit={this.onLogin}>
              Hello Sam... At least, I hope that is you...
            </LoginForm>
          }
          {isLoggingIn === true &&
            <CircularProgress />
          }
          {err &&
            <ErrorDialog
              onClose={()=>this.setState({err: undefined})}
            >
              {err}
            </ErrorDialog>
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
