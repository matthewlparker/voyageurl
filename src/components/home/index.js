import React from 'react';
import URLField from '../url-field';
import styled from 'styled-components/macro';
import DatabaseRequest from '../api-request/database-request';

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

const CenterDiv = styled.div`
  text-align: center;
`;

const CenterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const Home = () => {
  return (
    <StyledHome>
      <H1>Welcome</H1>
      <H2>To Voyageurl</H2>
      <CenterDiv>
        Click to test your connection to the MongoDB example endpoint
      </CenterDiv>
      <CenterContent>
        <DatabaseRequest />
        <URLField />
      </CenterContent>
    </StyledHome>
  );
};

export default Home;
