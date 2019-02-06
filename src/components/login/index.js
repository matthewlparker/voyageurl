import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

const StyledLogin = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-left: 1px solid black;
  background-color: var(--color-blue);
  border-right: 1px solid black;
`;

const StyledLink = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  background: white;
  border: none;
  border-radius: 4px;
  padding: 0.5em 2em;
  margin-bottom: 100px;
  cursor: pointer;
  text-transform: uppercase;
  outline: inherit;

  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);

  &:hover {
    background-color: var(--background-primary);
  }
`;

const StyledLogo = styled.h1`
  color: white;
  font-size: var(--font-xl);
`;

const useSetRedirectUrl = auth => {
  const { isAuthenticated } = auth;
  useEffect(() => {
    if (!isAuthenticated()) {
      const redirectURL = window.location.pathname;
      localStorage.setItem('redirectURL', JSON.stringify(redirectURL));
    }
  }, []);
};

const Login = props => {
  const { auth } = props;
  useSetRedirectUrl(auth);

  return (
    <StyledLogin>
      <StyledLogo>Lionly</StyledLogo>
      <StyledLink onClick={auth.login}>Login</StyledLink>
    </StyledLogin>
  );
};

export default Login;
