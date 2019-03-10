import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import Spinner from './components/common/spinner';
const Home = lazy(() => import('./components/home'));
const Login = lazy(() => import('./components/login'));
const Profile = lazy(() => import('./components/profile'));
const NotFound = lazy(() => import('./components/pages/not-found.js'));

const Routes = props => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            !props.user ? (
              <Home setUser={props.setUser} />
            ) : props.user ? (
              <Redirect to={`/lion`} />
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
            ) : props.user ? (
              <Redirect to={`/lion`} />
            ) : (
              <div />
            )
          }
        />
        <Route
          path="/lion"
          render={() =>
            props.user ? (
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
