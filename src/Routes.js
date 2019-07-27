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
            props.user === 'visitor' ? (
              <Home
                user={props.user}
                setUser={props.setUser}
                urls={props.urls}
                setURLs={props.setURLs}
              />
            ) : props.user && props.user !== 'visitor' ? (
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
            !props.user || props.user === 'visitor' ? (
              <Login />
            ) : props.user && props.user !== 'visitor' ? (
              <Redirect to={`/lion`} />
            ) : (
              <div />
            )
          }
        />
        <Route
          path="/lion"
          render={() =>
            props.user && props.user !== 'visitor' ? (
              <Profile
                user={props.user}
                setUser={props.setUser}
                urls={props.urls}
                setURLs={props.setURLs}
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
