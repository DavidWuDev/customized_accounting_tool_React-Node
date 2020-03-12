import { AuthService } from '@app/services';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const render = (props: any) => {
    if (!AuthService.isAuthenticated()) {
      let redirectUrl = '/login';
      if (props.location.pathname !== '/' || props.location.search !== '') {
        redirectUrl += '?redirect=' +
          encodeURIComponent(props.location.pathname + props.location.search);
      }
      return <Redirect to={redirectUrl} />;
    }

    return <Component {...props} />;
  };

  return (
    <Route {...rest} render={render} />
  );
};

export default PrivateRoute;
