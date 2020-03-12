import { Button, Typography } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { View } from '@app/components';
import styles from './not-found.styles';

class Layout extends React.Component<{ classes: any } & RouteComponentProps, {}> {
  static propTypes: { classes: PropTypes.Validator<object> };

  render() {
    const { classes } = this.props;
    return (
      <View flexGrow alignItems="center" justifyContent="center">
        <Typography variant="h4">Page not found</Typography>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          component={Link}
          to="/"
        >
          Go To Home
        </Button>
      </View >
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withWidth()(withStyles(styles)(Layout));
