import { ActionFooter, View } from '@app/components';
import { Button, makeStyles, Theme, Toolbar } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/SaveOutlined';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    padding: 0,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  saveButton: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  actionFooter: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

interface IProps {
  name: string;
  title: string;
  isSubmitting: boolean;
  submitCount: number;
  isValid: boolean;
}

const CreateEditDataFooter: React.FC<IProps> = (props) => {
  const classes = useStyles(props);

  const disabled = !props.isValid && props.submitCount > 0;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button color="primary" variant="contained" type="submit" className={classes.saveButton} disabled={props.isSubmitting || disabled}>
          <SaveIcon />
          &nbsp;&nbsp;{props.isSubmitting ? 'Saving...' : `Save ${props.title.toLowerCase()}`}
        </Button>
      </Toolbar>
      <ActionFooter className={classes.actionFooter}>
        <View flexGrow flexDirection="row" justifyContent="center">
          <ActionFooter.ActionButton variant="outlined" color="primary" disabled={props.isSubmitting || disabled} type="submit">
            <SaveIcon />
            &nbsp;&nbsp;{props.isSubmitting ? 'Saving...' : `Save ${props.title.toLowerCase()}`}
          </ActionFooter.ActionButton>
        </View>
      </ActionFooter>
    </React.Fragment>
  );
};

export default CreateEditDataFooter;
