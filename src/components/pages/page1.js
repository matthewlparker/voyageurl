import React from 'react';
import styled from 'styled-components/macro';

const StyledPage1 = styled.div`
  padding-top: 60px;
`;

const H1 = styled.div`
  text-align: center;
  font-size: 32px;
  margin-bottom: 10px;
`;

const Page1 = () => (
  <StyledPage1>
    <H1>Page 1</H1>
  </StyledPage1>
);

export default Page1;
