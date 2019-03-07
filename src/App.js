import React, { useState, useEffect } from 'react';
import Routes from './Routes';
import jwt from 'jsonwebtoken';
import Header from './components/header';
import { fetchURLs } from './api-requests/fetch-urls';
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
  const [userURLs, setUserURLs] = useState([]);

  useEffect(() => {
    if (user) {
      const decodedUser = jwt.verify(user, process.env.REACT_APP_SECRET_KEY);
      if (decodedUser) {
        setUser(decodedUser);
      }
    }
  }, []);

  useEffect(
    () => {
      if (user && user.username) {
        fetchURLs(user.urls).then(result => setUserURLs(result));
      }
    },
    [user]
  );

  return (
    <StyledApp>
      <Header user={user} setUser={setUser} />
      <Content>
        <Routes user={user} setUser={setUser} userURLs={userURLs} />
      </Content>
    </StyledApp>
  );
};

export default App;
