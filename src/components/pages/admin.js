import React from 'react';
import styled from 'styled-components/macro';

const StyledAdmin = styled.div`
  padding-top: 60px;
`;

const H1 = styled.div`
  text-align: center;
  font-size: 32px;
  margin-bottom: 10px;
`;

const Admin = () => (
  <StyledAdmin>
    <H1>Admin Access Only</H1>
  </StyledAdmin>
);

export default Admin;
