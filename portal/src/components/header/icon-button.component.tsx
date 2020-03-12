import { IconButton } from '@material-ui/core';
import React from 'react';

interface IProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const HeaderIconButton: React.FC<IProps> = (props) => {
  return (
    <IconButton color="inherit" onClick={props.onClick}>
      {props.children}
    </IconButton>
  );
};

export default HeaderIconButton;
