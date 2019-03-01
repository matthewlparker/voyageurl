import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import Spinner from './components/common/spinner';

const Home = lazy(() => import('./components/home'));
const Profile = lazy(() => import('./components/profile'));
const Page1 = lazy(() => import('./components/pages/page1.js'));
const Page2 = lazy(() => import('./components/pages/page2.js'));
const NotFound = lazy(() => import('./components/pages/notFound.js'));

const WaitingComponent = Component => props => (
  <Suspense fallback={<Spinner />}>
    <Component {...props} />
  </Suspense>
);

const Routes = props => {
  return (
    <Switch>
      <Route exact path="/" component={WaitingComponent(Home)} />
      <Route
        path="/lion/:username"
        render={() =>
          props.user ? (
            WaitingComponent(Profile)(props.user)
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route exact path="/page1" component={WaitingComponent(Page1)} />
      <Route exact path="/page2" component={WaitingComponent(Page2)} />
      <Route path="*" component={WaitingComponent(NotFound)} />
    </Switch>
  );
};

export default Routes;
