import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Routes from './Routes';
import jwt from 'jsonwebtoken';
import Header from './components/header';
import * as authActions from './actions/authorization';
import styled from 'styled-components/macro';

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

export const App = props => {
  const [user, setUser] = useState(localStorage.getItem('userToken'));
  console.log('user: ', user);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      const decodedUser = jwt.verify(
        userToken,
        process.env.REACT_APP_SECRET_KEY
      );
      setUser(decodedUser);
    }
  }, []);

  return (
    <StyledApp>
      <Header user={user} setUser={setUser} />
      <Content>
        <Routes user={user} />
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
