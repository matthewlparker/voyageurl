import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../dropdown';
import styled from 'styled-components/macro';

const StyledHeader = styled.header`
  height: var(--header-height);
  background-color: var(--color-orange);
  padding: 0 1rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--screen-width-medium);
  height: 100%;
  color: white;
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  width: 100%;
  padding: 12px 16px;
`;

const Div = styled.div`
  width: 100%;
  color: black;
  padding: 12px 16px;
`;

const HeaderLeft = styled.div`
  display: flex;
  justify-self: flex-start;
  width: 100%;
  height: 100%;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-self: flex-end;
  max-height: 100%;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-l);
  @media (max-width: 600px) {
    font-size: var(--font-m);
    margin-left: 0;
  }
`;

const Header = props => {
  const { login, logout, isAuthenticated } = props.auth;

  return (
    <StyledHeader>
      <Content>
        <HeaderLeft>
          <Title>Lionly</Title>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown title="User Menu">
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/page1">Page 1</StyledLink>
            <StyledLink to="/page2">Page 2</StyledLink>
            {props.userRole &&
              props.userRole === 'Admin' && (
                <StyledLink to="/admin">Admin</StyledLink>
              )}
            {!isAuthenticated() && <Div onClick={login}>Login</Div>}
            {isAuthenticated() && <Div onClick={logout}>Logout</Div>}
          </Dropdown>
        </HeaderRight>
      </Content>
    </StyledHeader>
  );
};

export default Header;
