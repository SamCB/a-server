import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';
import { LoginForm } from './components/login';
import { ErrorDialog } from './components/error';
import { AppForm } from './components/form';
import { LoadingSpinner } from './components/loading';
// import CircularProgress from 'material-ui/CircularProgress';

import loginAction from './actions/login';
import submitAction from './actions/submit';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggingIn: false,
      isSubmitting: false,
      password: undefined,
      text: undefined,
      textDirty: false,
      err: undefined
    };

    this.onLogin = this.onLogin.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.delayedSetState = this.delayedSetState.bind(this);
  }

  onLogin(login) {
    this.setState({
      isLoggingIn: true
    });

    loginAction(login.password)
    .then((result) => {
      this.setState({
        text: result,
        password: login.password,
      });
      this.delayedSetState({isLoggingIn: false}, 1000);
    })
    .catch((err) => {
      this.setState({
        err: err.message,
      });
      this.delayedSetState({isLoggingIn: false}, 1000);
    })
  }

  onFormChange(e) {
    this.setState({text: e.target.value, textDirty: true});
  }

  onFormSubmit(value) {
    this.setState({
      isSubmitting: true
    });

    submitAction(this.state.password, this.state.text)
    .then((result) => {
      this.setState({
        textDirty: false
      });
      this.delayedSetState({
        text: result,
        isSubmitting: false
      }, 1000);
    })
    .catch((err) => {
      this.setState({
        err: err.message,
      });
      this.delayedSetState({isSubmitting: false}, 1000);
    })
  }

  delayedSetState(state, time) {
    setTimeout(()=>{this.setState(state)}, time)
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          title="A Server"
          showMenuIconButton={false}
        />
        <div class="wrapper">
          {this.state.password === undefined &&
            <LoginForm onSubmit={this.onLogin}>
              Hello Sam... At least, I hope that is you...
            </LoginForm>
          }
          {(this.state.isLoggingIn === true || this.state.isSubmitting === true) &&
            <LoadingSpinner />
          }
          {this.state.err &&
            <ErrorDialog
              onClose={()=>this.setState({err: undefined})}
            >
              {this.state.err}
            </ErrorDialog>
          }
          {this.state.password !== undefined &&
           this.state.text !== undefined &&
           this.state.isLoggingIn === false &&
            <AppForm
              value={this.state.text}
              canSubmit={this.state.textDirty}
              onChange={this.onFormChange}
              onSubmit={this.onFormSubmit}
            />
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
