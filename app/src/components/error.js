import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class ErrorDialog extends React.Component {
    render() {
      const actions = [
          <FlatButton label="Ok" onClick={this.props.onClose} />
      ];
      return (
        <Dialog
          title="An Error Occurred"
          actions={actions}
          modal={false}
          open={true}
          onRequestClose={this.props.onClose}
        >
          {this.props.children}
        </Dialog>
      )
  }
}
