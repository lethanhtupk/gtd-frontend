import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import withAuthorization from '../../components/Session/withAuthorization';
import AccountOverview from './AccountOverview';
import SideBar from './SideBar';
import * as ROUTES from '../../constants/routes';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import { sideBarData } from '../../utils/Constant';

const AccountPage = (props) => {
  const { authUser } = props;
  const currentPath = window.location.pathname;

  const currentActive = sideBarData.filter(
    (item, index) => item.path === currentPath
  );

  const [active, setActive] = useState(
    currentActive.length > 0 ? currentActive[0].key : 0
  );
  return (
    <>
      <div className="account-page w-full h-full flex justify-center">
        <div className="flex w-4/5 mt-8">
          <Router>
            <SideBar
              authUser={authUser}
              active={active}
              setActive={setActive}
            />
            <Switch>
              <Route
                path={ROUTES.ACCOUNT_OVERVIEW}
                exact
                component={() => (
                  <AccountOverview authUser={authUser} setActive={setActive} />
                )}
              />
              <Route
                path={ROUTES.EDIT_PROFILE}
                exact
                component={() => (
                  <EditProfile authUser={authUser} setActive={setActive} />
                )}
              />
              <Route
                path={ROUTES.CHANGE_PASSWORD}
                exact
                component={() => (
                  <ChangePassword authUser={authUser} setActive={setActive} />
                )}
              />
              <AccountOverview authUser={authUser} setActive={setActive} />
            </Switch>
          </Router>
        </div>
      </div>
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
