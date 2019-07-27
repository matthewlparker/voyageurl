import React, { useState, useEffect } from 'react';
import Routes from './Routes';
import jwt from 'jsonwebtoken';
import Header from './components/header';
import { fetchURLs } from './api-requests/fetch-urls';
import { fetchUser } from './api-requests/fetch-user';
import styled from 'styled-components/macro';

const StyledApp = styled.div`
  height: 100%;
  background-color: var(--background-primary);
  font-family: 'Roboto', sans-serif;
  overflow-y: auto;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - var(--header-height));
  max-width: var(--screen-width-medium);
  margin: 0 auto;
`;

export const App = props => {
  const [user, setUser] = useState();
  const [urls, setURLs] = useState([]);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      const decodedUser = jwt.verify(
        userToken,
        process.env.REACT_APP_SECRET_KEY
      );
      if (decodedUser) {
        fetchUser(decodedUser._id).then(result => setUser(result));
      }
    } else {
      setUser('visitor');
    }
  }, []);

  useEffect(
    () => {
      if (user && user !== 'visitor') {
        fetchURLs(user.urls).then(result => setURLs(result));
      }
      if (user && user === 'visitor') {
        const visitorURLs = JSON.parse(localStorage.getItem('visitorURLs'));
        if (visitorURLs) {
          setURLs(visitorURLs);
        }
      }
    },
    [user]
  );
  return (
    <StyledApp>
      <Header user={user} setUser={setUser} />
      <Content>
        <Routes user={user} setUser={setUser} urls={urls} setURLs={setURLs} />
      </Content>
    </StyledApp>
  );
};

export default App;
