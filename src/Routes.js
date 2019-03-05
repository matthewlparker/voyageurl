import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import Spinner from './components/common/spinner';
import AuthRedirect from './components/auth-redirect';

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
    <React.Fragment>
      {props.user ? (
        <AuthRedirect user={props.user} setUser={props.setUser} />
      ) : (
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              WaitingComponent(Home)(
                (props: {
                  user: props.user,
                  setUser: props.setUser,
                })
              )
            }
          />
          <Route
            path="/lion/:username"
            render={() =>
              props.user ? (
                WaitingComponent(Profile)(
                  (props: {
                    user: props.user,
                    userURLs: props.userURLs,
                  })
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route exact path="/page1" component={WaitingComponent(Page1)} />
          <Route exact path="/page2" component={WaitingComponent(Page2)} />
          <Route path="*" component={WaitingComponent(NotFound)} />
        </Switch>
      )}
    </React.Fragment>
  );
};

export default Routes;
