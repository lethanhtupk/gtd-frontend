import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import withAuthorization from '../../components/Session/withAuthorization';
import AccountOverview from './AccountOverview';
import SideBar from './SideBar';
import * as ROUTES from '../../constants/routes';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';

const AccountPage = (props) => {
  const { authUser } = props;

  return (
    <>
      <header>
        <title>Account Overview - GTD</title>
      </header>

      <div className="account-page w-full h-full flex justify-center">
        <div className="flex w-4/5 mt-8">
          <Router>
            <SideBar authUser={authUser} />
            <Switch>
              <Route
                path={ROUTES.ACCOUNT_OVERVIEW}
                exact
                component={() => <AccountOverview authUser={authUser} />}
              />
              <Route
                path={ROUTES.EDIT_PROFILE}
                exact
                component={() => <EditProfile authUser={authUser} />}
              />
              <Route
                path={ROUTES.CHANGE_PASSWORD}
                exact
                component={() => <ChangePassword authUser={authUser} />}
              />
            </Switch>
          </Router>
        </div>
      </div>
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
