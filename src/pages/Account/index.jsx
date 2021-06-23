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

  console.log(currentPath);

  const currentActive = sideBarData.filter(
    (item, index) => item.path === currentPath
  );

  const [active, setActive] = useState(
    currentActive.length > 0 ? currentActive[0].key : 0
  );

  return (
    <>
      <div className="flex justify-center w-full h-full account-page">
        <div className="flex w-5/6 mt-8 md:w-4/5">
          <div className="hidden w-3/12 bg-gray-600 md:block">
            <SideBar
              authUser={authUser}
              active={active}
              setActive={setActive}
            />
          </div>
          <Router>
            <div className="w-full md:w-9/12">
              <Switch>
                <Route
                  path={ROUTES.ACCOUNT_OVERVIEW}
                  exact
                  render={(props) => (
                    <AccountOverview
                      authUser={authUser}
                      setActive={setActive}
                    />
                  )}
                />
                <Route
                  path={ROUTES.EDIT_PROFILE}
                  exact
                  render={() => (
                    <EditProfile authUser={authUser} setActive={setActive} />
                  )}
                />
                <Route
                  path={ROUTES.CHANGE_PASSWORD}
                  exact
                  render={() => (
                    <ChangePassword authUser={authUser} setActive={setActive} />
                  )}
                />
                <AccountOverview authUser={authUser} setActive={setActive} />
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
