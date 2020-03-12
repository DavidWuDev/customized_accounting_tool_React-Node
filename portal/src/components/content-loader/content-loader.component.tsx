import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'inline-block',
    width: '100%',
    maxWidth: 200,
    height: 12,
    backgroundColor: '#eeeeee',
    borderRadius: 4,
    animation: 'blinkingAnimation 2s infinite',
  },
}));

const TableCellContentLoader: React.FC = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.root} />
  );
};

export default {
  TableCell: TableCellContentLoader,
};
