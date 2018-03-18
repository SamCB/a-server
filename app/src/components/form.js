import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class AppForm extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    this.props.onSubmit({
      text: this.props.value
    });
  }

  render() {
    return (
      <Paper zDepth={2}>
        <TextField
          value={this.props.value}
          multiLine={true}
          hintText="Value"
          floatingLabelText="Value"
          onChange={this.props.onChange}
        />
        <br />
        <RaisedButton
          label="Submit"
          primary={true}
          disabled={!this.props.canSubmit}
          onClick={this.onSubmit}
        />
      </Paper>
    );
  }
}

AppForm.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  canSubmit: PropTypes.bool
};
AppForm.defaultProps = {
  canSubmit: true
};
