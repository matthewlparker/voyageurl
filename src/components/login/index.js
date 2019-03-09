import React from 'react';
import styled from 'styled-components/macro';
import ProviderButton from '../common/provider-button';
import githubIcon from '../../assets/provider-icons/GitHub-Mark-32px.png';

const StyledLogin = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 100%;
  border-left: 1px solid black;
  background-color: var(--color-orange-pale);
  // const StyledLink = styled.div
`;

const StyledLoginCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 375px;
  margin: 80px auto;
  border: 1px solid var(--color-orange-l);
  border-radius: 4px;
  padding: 50px 53px;
  background: #fff;
`;

const StyledLogo = styled.h1`
  color: var(--color-orange);
  font-size: var(--font-xl);
  font-family: Roboto, sans-serif;
  font-weight: 900;
`;

const Headline = styled.div`
  font-size: 1.2rem;
  color: var(--color-grey);
  text-transform: uppercase;
  margin: 15px 0 15px 0;
`;

const ProvidersHeader = styled.div`
  font-size: var(--font-s);
  color: var(--color-grey-l);
  text-transform: uppercase;
`;

const Providers = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
  grid-gap: 5px;
  margin-top: 5px;
`;

const Login = props => {
  return (
    <StyledLogin>
      <StyledLoginCard>
        <StyledLogo>Lionly</StyledLogo>
        <Headline>SIGN IN & SHARE</Headline>
        <ProvidersHeader>SIGN IN WITH:</ProvidersHeader>
        <Providers>
          <ProviderButton
            color={'#4285f4 '}
            width={'20'}
            svg={
              'https://d1ayxb9ooonjts.cloudfront.net/8bc625062aeffa94729b9336243bed9d.svg'
            }
            href={'/auth/google'}
          />
          <ProviderButton
            color={'#3c5a99'}
            width={'20'}
            svg={
              'https://d1ayxb9ooonjts.cloudfront.net/0e5903c8a59540fefb8d56fe51863bb0.svg'
            }
            href={'/auth/facebook'}
          />
          <ProviderButton
            color={'var(--color-blue-l)'}
            width={'22'}
            svg={
              'https://d3h5jhobc20ump.cloudfront.net/b8221293363ccb5ce7460067acbe55f5.svg'
            }
            href={'/auth/twitter'}
          />
          <ProviderButton
            color={'#24292E'}
            width={'20'}
            svg={githubIcon}
            href={'/auth/github'}
          />
        </Providers>
      </StyledLoginCard>
    </StyledLogin>
  );
};

export default Login;
