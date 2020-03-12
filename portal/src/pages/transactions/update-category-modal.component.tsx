import { DataLookup } from '@app/components';
import { CategoryService } from '@app/services';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Theme, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';

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
  onClose: () => void;
  onSubmit: (category: string) => void;
}

const UpdateCategoryModal: React.FC<IProps> = (props) => {
  const [category, setCateogry] = useState('');
  const classes = useStyles(props);

  const theme = useTheme<Theme>();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setCateogry('');
  }, [props.open]);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
      disableBackdropClick
      disableEscapeKeyDown
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>Update category</DialogTitle>
      <DialogContent>
        <div className={classes.messageContainer}>
          <DataLookup
            fullWidth
            variant="outlined"
            label="Category"
            InputLabelProps={{
              shrink: true,
            }}
            predata={[{
              _id: 'null',
              name: 'Remove category',
            }]}
            service={CategoryService}
            value={category}
            onChange={(e) => setCateogry(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button className={classes.actionButton} onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button className={classes.actionButton} onClick={() => props.onSubmit(category)} color="secondary" disabled={!Boolean(category)}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCategoryModal;
