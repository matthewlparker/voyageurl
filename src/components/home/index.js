import React, { useEffect } from 'react';
import URLList from '../url-list';
import URLField from '../url-field';
import styled from 'styled-components/macro';

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
  max-width: 600px;
  width: 95%;
  margin: 0 auto;
  margin-top: 10px;
`;

const StyledURLList = styled(URLList)`
  margin-top: 35px !important;
`;

const Home = props => {
  useEffect(
    () => {
      localStorage.setItem('visitorURLs', JSON.stringify(props.urls));
    },
    [props.urls]
  );

  const urlRemove = urlData => {
    const newURLs = props.urls.filter(
      visitorURL => visitorURL.url !== urlData.url
    );
    props.setURLs(newURLs);
  };
  return (
    <StyledHome>
      <H1>Be Lionly</H1>
      <H2>Lions don't use long links, and neither should you</H2>
      <CenterContent>
        <URLField
          user={props.user}
          setUser={props.setUser}
          setURLs={props.setURLs}
        />
        {props.urls &&
          props.urls.length > 0 && (
            <StyledURLList
              user={props.user}
              urls={props.urls}
              urlRemove={urlRemove}
              setURLs={props.setURLs}
            />
          )}
      </CenterContent>
    </StyledHome>
  );
};

export default Home;
