import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import Admin from './components/pages/admin';
import Callback from './components/callback';
import Spinner from './components/common/spinner';

const Home = lazy(() => import('./components/home'));
const Page1 = lazy(() => import('./components/pages/page1.js'));
const Page2 = lazy(() => import('./components/pages/page2.js'));
const NotFound = lazy(() => import('./components/pages/notFound.js'));

const WaitingComponent = Component => props => (
  <Suspense fallback={<Spinner />}>
    <Component {...props} />
  </Suspense>
);

const Routes = props => {
  const handleAuthentication = ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      props.auth.handleAuthentication();
    }
  };

  return (
    <Switch>
      <Route exact path="/" component={WaitingComponent(Home)} />
      <Route exact path="/page1" component={WaitingComponent(Page1)} />
      <Route exact path="/page2" component={WaitingComponent(Page2)} />
      <Route
        path="/admin"
        render={() =>
          props.userRole === 'Admin' ? <Admin /> : <Redirect to="/" />
        }
      />
      <Route
        exact
        path="/callback"
        render={props => {
          handleAuthentication(props);
          return <Callback {...props} />;
        }}
      />
      <Route path="*" component={WaitingComponent(NotFound)} />
    </Switch>
  );
};

export default Routes;
