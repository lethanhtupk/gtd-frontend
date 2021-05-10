import React from 'react';
import withAuthorization from '../../components/Session/withAuthorization';

const AccountPage = () => (
  <div>
    <h1>Account Page</h1>
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
