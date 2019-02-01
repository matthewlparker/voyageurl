import React from 'react';
import styled from 'styled-components/macro';

const StyledPage2 = styled.div`
  padding-top: 60px;
`;

const H1 = styled.div`
  text-align: center;
  font-size: 32px;
  margin-bottom: 10px;
`;

const Page2 = () => (
  <StyledPage2>
    <H1>Page 2</H1>
  </StyledPage2>
);

export default Page2;
