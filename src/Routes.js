import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import Spinner from './components/common/spinner';
const Home = lazy(() => import('./components/home'));
const Login = lazy(() => import('./components/login'));
const Profile = lazy(() => import('./components/profile'));
const NotFound = lazy(() => import('./components/pages/not-found.js'));

const Routes = props => {
  let authorizedUser;
  if (props.user && props.user.username) {
    authorizedUser = props.user.username
      .split(' ')
      .join('')
      .toLowerCase();
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            !props.user ? (
              <Home setUser={props.setUser} />
            ) : authorizedUser ? (
              <Redirect to={`/lion/${authorizedUser}`} />
            ) : (
              <div />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={() =>
            !props.user ? (
              <Login />
            ) : authorizedUser ? (
              <Redirect to={`/lion/${authorizedUser}`} />
            ) : (
              <div />
            )
          }
        />
        <Route
          exact
          path="/lion/:username"
          render={() =>
            authorizedUser ? (
              <Profile
                user={props.user}
                setUser={props.setUser}
                userURLs={props.userURLs}
              />
            ) : (
              <Redirect to={'/'} />
            )
          }
        />
        <Route path="*" component={() => <NotFound />} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
