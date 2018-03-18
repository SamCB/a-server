import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  width: '100%',
  marginTop: '15px',
  marginBottom: '15px',
  padding: '15px'
};

const textStyle = {
  minHeight: '350px',
  padding: '15px',
  fontFamily: "'IBM Plex Mono', monospace"
};

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
      <Paper style={style} zDepth={2}>
        <Paper>
          <TextField
            value={this.props.value}
            multiLine={true}
            hintText="Value"
            onChange={this.props.onChange}
            fullWidth={true}
            underlineShow={false}
            style={textStyle}
          />
        </Paper>
        <br />
        <RaisedButton
          label="Submit"
          primary={true}
          disabled={!this.props.canSubmit}
          onClick={this.onSubmit}
          fullWidth={true}
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
