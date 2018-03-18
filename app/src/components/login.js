import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  padding: '15px',
  marginTop: '15px',
  width: '100%'
}

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {password: ''};

    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value});
  }

  onSubmit(e) {
    this.props.onSubmit({password: this.state.password});
  }

  render() {
    return (
      <Paper style={style} zDepth={2}>
        {this.props.children}
        <br />
        <TextField
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
          style={{width: '100%'}}
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <br />
        <RaisedButton
          label="Submit"
          primary={true}
          onClick={this.onSubmit}
          fullWidth={true}
        />
      </Paper>
    );
  }
}
