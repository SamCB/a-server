import React from 'react';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

export function LoadingSpinner(props) {
  return (
    <Dialog modal={true} open={true}>
      <CircularProgress />
    </Dialog>
  );
}
