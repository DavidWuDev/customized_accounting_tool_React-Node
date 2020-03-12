import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IProps {
  onClick?: () => void;
}

const BackButton: React.FC<RouteComponentProps & IProps> = (props) => {
  const defaultGoBack = () => props.history.goBack();
  const onClick: any = props.onClick || defaultGoBack;

  return (
    <IconButton color="inherit" onClick={onClick}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default withRouter(BackButton);
