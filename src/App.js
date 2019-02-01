import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Auth from './auth/auth.js';
import Routes from './Routes';

import Header from './components/header';

import * as authActions from './actions/authorization';
import styled from 'styled-components/macro';
const auth = new Auth();

const StyledApp = styled.div`
  height: 100%;
  background-color: var(--background-primary);
  font-family: 'Roboto', sans-serif;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - var(--header-height));
  max-width: var(--screen-width-medium);
  margin: 0 auto;
`;

const useAuthorization = props => {
  const { isAuthenticated, userProfile, getProfile } = auth;
  useEffect(() => {
    if (isAuthenticated() && !userProfile) {
      let userRole;
      getProfile((err, profile) => {
        userRole = profile[process.env.REACT_APP_AUTH0_ROLES_NAMESPACE];
        if (!userRole || !userRole[0]) {
          userRole = 'User';
        }
        props.setUserProfile(userRole.toString());
      });
    }
  });
};

export const App = props => {
  const { renewSession } = auth;

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }, []);

  useAuthorization(props);
  return (
    <StyledApp>
      <Header auth={auth} userRole={props.userRole} />
      <Content>
        <Routes auth={auth} />
      </Content>
    </StyledApp>
  );
};

export const mapStateToProps = state => ({
  userRole: state.userProfile.role,
});

export const mapDispatchToProps = dispatch => ({
  setUserProfile: role => dispatch(authActions.setUserProfile(role)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
