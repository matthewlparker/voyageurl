import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Dropdown from '../dropdown';
import Cookies from 'universal-cookie';
import styled from 'styled-components/macro';
const cookies = new Cookies();

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
  color: white;
  padding: 12px 16px;
`;

const StyledHref = styled.a`
  color: black;
  padding: var(--pad);
`;

const LogoutButton = styled.div`
  cursor: pointer;
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
  color: white;
  font-size: var(--font-l);
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
  const logout = () => {
    cookies.remove('userCookie', { path: '/' });
    localStorage.removeItem('userToken');
    props.setUser();
    window.location.href = '/';
  };

  return (
    <StyledHeader>
      <Content>
        <HeaderLeft>
          <Title>Lionly</Title>
        </HeaderLeft>
        <HeaderRight>
          {props.user && props.user.username ? (
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          ) : (
            <Dropdown
              title="login"
              children={[
                <StyledHref href="/auth/google">Google</StyledHref>,
                <StyledHref href="/auth/facebook">Facebook</StyledHref>,
                <StyledHref href="/auth/github">Github</StyledHref>,
                <StyledHref href="/auth/twitter">Twitter</StyledHref>,
              ]}
            />
          )}
        </HeaderRight>
      </Content>
    </StyledHeader>
  );
};

export default Header;
