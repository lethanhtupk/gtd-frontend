import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthUserContext from './context';
import * as ROUTES from '../../constants/routes';

const withAuthorization = (condition) => (Component) => {
  const WithAuthorization = (props) => {
    return (
      <AuthUserContext.Consumer>
        {(authUserProps) => {
          const { authUser } = authUserProps;
          if (!condition(authUser[0])) {
            props.history.push(ROUTES.LOGIN);
          }
          return <Component {...props} />;
        }}
      </AuthUserContext.Consumer>
    );
  };
  return withRouter(WithAuthorization);
};

export default withAuthorization;
