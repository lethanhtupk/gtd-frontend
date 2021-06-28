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
          console.log(authUser);
          console.log(!condition(authUser[0]));
          if (!condition(authUser[0])) {
            props.history.push(ROUTES.LOGIN);
          }
          return <Component {...props} authUser={authUser} />;
        }}
      </AuthUserContext.Consumer>
    );
  };
  return withRouter(WithAuthorization);
};

export default withAuthorization;
