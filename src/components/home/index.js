import React, { useState, useEffect } from 'react';
import LinkPreview from '../link-preview';
import URLField from '../url-field';
import styled from 'styled-components/macro';
import Cookies from 'universal-cookie';
import { PromiseProvider } from 'mongoose';

const cookies = new Cookies();

const StyledHome = styled.div`
  max-height: calc(100vh - 120px);
  padding-top: 60px;
`;

const H1 = styled.h1`
  text-align: center;
  font-size: 32px;
  margin-bottom: 10px;
`;

const H2 = styled.h2`
  text-align: center;
  font-size: 16px;
  margin-bottom: 10px;
`;

const CenterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const Home = props => {
  const [returnVisitorURLs, setReturnVisitorURLs] = useState([]);

  useEffect(() => {
    const visitorURLs = cookies.get('visitorURLs');
    if (visitorURLs && visitorURLs.length > 0) {
      setReturnVisitorURLs(visitorURLs);
    } else if (!visitorURLs) {
      cookies.set('visitorURLs', [], { path: '/' });
    }
  }, []);
  console.log('home props.user: ', props.user);
  return (
    <StyledHome>
      <H1>Be Lionly</H1>
      <H2>Lions don't use long links, and neither should you</H2>
      <CenterContent>
        <URLField
          user={props.user}
          cookies={cookies}
          setUser={props.setUser}
          setReturnVisitorURLs={setReturnVisitorURLs}
        />
      </CenterContent>
      {returnVisitorURLs &&
        returnVisitorURLs.length > 0 &&
        returnVisitorURLs
          .sort((a, b) => b._id - a._id)
          .map(returnVisitorURL => (
            <LinkPreview
              metadata={returnVisitorURL}
              key={returnVisitorURL.hash}
            />
          ))}
    </StyledHome>
  );
};

export default Home;
