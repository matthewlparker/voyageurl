import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components/macro';
import ProviderButton from '../common/provider-button';
import { handleLoginErrors } from './login-util';
import githubIcon from '../../assets/provider-icons/GitHub-Mark-32px.png';

const StyledLogin = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 100%;
  border-left: 1px solid black;
  background-color: var(--color-orange-pale);
`;

const StyledLoginCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 375px;
  margin: 80px auto;
  box-shadow: 0 0 5px var(--color-orange);
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

const SectionHeader = styled.div`
  font-size: var(--font-s);
  color: var(--color-grey-l);
  text-transform: uppercase;
`;

const Providers = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
  grid-gap: 5px;
  margin: 5px 0;
`;

const StyledForm = styled.form`
  display: grid;
  grid-row-gap: 5px;
  width: 185px;
  margin-top: 5px;
`;

const StyledInput = styled.input`
  width: 185px;
  padding: 10px;
  border: 1px solid var(--color-orange);
  border-color: var(--color-orange) !important;
  border-radius: 2.5px;
  color: ${props => (props.error ? 'red' : '')};
  &::placeholder {
    color: ${props => (props.error ? 'red' : '')};
  }
  &:focus {
    border: 1px solid var(--color-orange);
    border-color: var(--color-orange);
    background: var(--color-orange-pale);
  }
`;

const StyledFormButton = styled.button`
  color: var(--color-orange);
  font-size: 16px;
  font-weight: 600;
  padding: 10px;
  border: 1px solid var(--color-orange) !important;
  border-radius: 2.5px;
  cursor: pointer;
  &:hover {
    background: var(--color-orange-pale);
  }
`;

const LoginMethodWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  font-size: 12px;
  color: var(--color-grey-l);
  margin-top: 5px;
`;

const LoginMethodMessage = styled.div`
  user-select: none;
`;

const LoginMethodButton = styled.div`
  color: var(--color-blue-l);
  cursor: pointer;
  user-select: none;
  &:hover {
    color: var(--color-blue);
  }
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--color-orange);
  margin-top: 5px;
`;

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginMethod, setLoginMethod] = useState('signin');

  const handleChange = (setStateCallback, e) => {
    if (loginMethod === 'signin') {
      setStateCallback(e.target.value);
    }
    if (loginMethod === 'signup') {
      setStateCallback(e.target.value);
    }
    setUsernameError('');
    setPasswordError('');
  };

  const handleLoginMethod = method => {
    setLoginMethod(method);
    setUsernameError('');
    setPasswordError('');
  };

  const handleSubmit = (authMethod, event) => {
    event.preventDefault();
    if (username.indexOf(' ') >= 0) {
      setUsernameError('Username can not have spaces');
    } else {
      loginReq(authMethod).then(result => {
        if (result.success) {
          window.location.href = '/';
        }
      });
    }
  };

  const loginReq = async authMethod => {
    const normalizedUsername = username.toLowerCase();
    return await fetch(`${process.env.REACT_APP_DOMAIN}/auth/${authMethod}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username: normalizedUsername, password }),
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        if (result.success) return result;
        // login error message handling
        if (result.details) {
          const errorMessage = result.details[0].message;
          return handleLoginErrors(
            errorMessage,
            setUsernameError,
            setPasswordError
          );
        }
        return result;
      })
      .catch(err => {
        return err;
      });
  };
  return (
    <StyledLogin>
      <StyledLoginCard>
        <StyledLogo>Lionly</StyledLogo>
        <Headline>SIGN IN & SHARE</Headline>
        <SectionHeader>SIGN IN WITH:</SectionHeader>
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
        <SectionHeader>OR:</SectionHeader>
        <StyledForm onSubmit={e => handleSubmit(loginMethod, e)}>
          <StyledInput
            value={username}
            placeholder="username"
            type="text"
            error={!!usernameError}
            onChange={e => handleChange(setUsername, e)}
          />
          <StyledInput
            value={password}
            placeholder="password"
            type="password"
            error={!!passwordError}
            onChange={e => handleChange(setPassword, e)}
          />
          <StyledFormButton type="submit">
            {loginMethod === 'signin' ? 'Sign In' : 'Sign Up'}
          </StyledFormButton>
        </StyledForm>
        <StyledErrorMessage>
          {usernameError || passwordError}
        </StyledErrorMessage>
        {loginMethod === 'signin' && (
          <LoginMethodWrapper>
            <LoginMethodMessage>Not a member?</LoginMethodMessage>
            <LoginMethodButton onClick={() => handleLoginMethod('signup')}>
              Sign Up
            </LoginMethodButton>
          </LoginMethodWrapper>
        )}
        {loginMethod === 'signup' && (
          <LoginMethodWrapper>
            <LoginMethodMessage>Already a member?</LoginMethodMessage>
            <LoginMethodButton onClick={() => handleLoginMethod('signin')}>
              Sign In
            </LoginMethodButton>
          </LoginMethodWrapper>
        )}
      </StyledLoginCard>
    </StyledLogin>
  );
};

export default withRouter(Login);
