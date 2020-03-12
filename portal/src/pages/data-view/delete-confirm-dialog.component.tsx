import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  messageContainer: {
    paddingTop: 16,
    paddingBottom: 48,
  },
  actionButton: {
    marginLeft: 16,
  },
});

interface IProps {
  open: boolean;
  deleting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  recordCount?: number;
  title?: string;
  message?: string;
}

const DeleteConfirmDialog: React.FC<IProps> = (props) => {
  const classes = useStyles(props);

  const title = props.title || `Delete record${props.recordCount > 1 ? 's' : ''}`;
  const message = props.message || `This operation can't be undone, do you really want to delete ${props.recordCount > 1 ? 'these' : 'this'} record?`;
  
  return (
    <Dialog
      maxWidth="xs"
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>
        <div className={classes.messageContainer}>
          {message}
        </div>
      </DialogContent>
      <DialogActions>
        <Button className={classes.actionButton} onClick={props.onClose} color="primary" disabled={props.deleting}>
          Cancel
        </Button>
        <Button className={classes.actionButton} onClick={props.onConfirm} color="secondary" disabled={props.deleting}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
