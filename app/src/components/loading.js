import React from 'react';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';

export function LoadingSpinner(props) {
  return (
    <Dialog modal={true} open={true}>
      <LinearProgress />
    </Dialog>
  );
}
