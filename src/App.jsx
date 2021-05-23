import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as dotenv from 'dotenv';
import Header from './components/Header';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import AccountPage from './pages/Account';
import * as ROUTES from './constants/routes';
import './styles/tailwind.css';
import Footer from './components/Footer';
import PopularProduct from './pages/PopularProduct';
import ProductDetail from './components/ProductDetail';
import TopDrops from './pages/TopDropProduct';
import WatchtList from './components/WatchList';
import WatchDetail from './components/WatchDetail';
import ActivateAccount from './pages/ActivateAccount';
import { withAuthentication } from './components/Session';
import ResendActivation from './pages/ResendActivation';
import SearchResult from './components/SearchResult';

dotenv.config();

function App() {
  return (
    <div className="App w-screen h-screen flex flex-col overflow-x-hidden justify-between filter">
      <Router>
        <Header />
        <Switch>
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.REGISTER} component={RegisterPage} />
          <Route path={ROUTES.LOGIN} component={LoginPage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route exact path={ROUTES.WATCHES} component={WatchtList} />
          <Route path={ROUTES.POPULAR_PRODUCTS} component={PopularProduct} />
          <Route path={ROUTES.TOP_DROPS_PRODUCT} component={TopDrops} />
          <Route path={`${ROUTES.PRODUCTS}/:id`} component={ProductDetail} />
          <Route path={`${ROUTES.WATCHES}/:id`} component={WatchDetail} />
          <Route
            path={`${ROUTES.ACTIVATE}/:uid/:token`}
            component={ActivateAccount}
          />
          <Route
            path={`${ROUTES.RESEND_ACTIVATION}`}
            component={ResendActivation}
          />
          <Route path={`${ROUTES.SEARCH_RESULT}`} component={SearchResult} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default withAuthentication(App);
