import React from 'react';

import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const BackButton = (props: any) => (
  <IconButton
    color="inherit"
    style={{ marginLeft: -12, marginRight: 20 }}
  >
    <ArrowBackIcon />
  </IconButton>
);

export default BackButton;
