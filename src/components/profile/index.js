import React from 'react';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
import styled from 'styled-components/macro';
import URLField from '../url-field';
import URLList from '../url-list';

const cookies = new Cookies();

const ProfileContent = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const LinkAccountButton = styled.div`
  padding: var(--pad);
  display: flex;
  align-content: center;
  cursor: pointer;
  width: max-content;
  border-radius: 5px;
`;

const OAuthAccounts = styled.div`
  display: flex;
`;

const Profile = props => {
  const linkAccount = accountHref => {
    // const cookies = new Cookies();
    cookies.set(
      'userCookie',
      jwt.sign(props.user, process.env.REACT_APP_SECRET_KEY),
      { path: '/' }
    );
    window.location.href = accountHref;
  };

  return (
    <ProfileContent>
      {props.user && props.user.username ? (
        <React.Fragment>
          <H1>Be Lionly, {props.user.username.split(' ')[0]}</H1>
          <H2>Lions don't use long links, and neither should you</H2>
          <URLField
            user={props.user}
            cookies={cookies}
            setUser={props.setUser}
          />
          <OAuthAccounts>
            {props.user.providers.facebookId === undefined ? (
              <LinkAccountButton onClick={() => linkAccount('/auth/facebook/')}>
                Facebook
              </LinkAccountButton>
            ) : (
              <LinkAccountButton
                style={{
                  color: props.user.providers.facebookId
                    ? 'var(--color-blue-l)'
                    : '',
                }}
              >
                Facebook
              </LinkAccountButton>
            )}
            {props.user.providers.googleId === undefined ? (
              <LinkAccountButton onClick={() => linkAccount('/auth/google/')}>
                Google
              </LinkAccountButton>
            ) : (
              <LinkAccountButton
                style={{
                  color: props.user.providers.googleId
                    ? 'var(--color-blue-l)'
                    : '',
                }}
              >
                Google
              </LinkAccountButton>
            )}
            {props.user.providers.githubId === undefined ? (
              <LinkAccountButton onClick={() => linkAccount('/auth/github/')}>
                Github
              </LinkAccountButton>
            ) : (
              <LinkAccountButton
                style={{
                  color: props.user.providers.githubId
                    ? 'var(--color-blue-l)'
                    : '',
                }}
              >
                Github
              </LinkAccountButton>
            )}
            {props.user.providers.twitterId === undefined ? (
              <LinkAccountButton onClick={() => linkAccount('/auth/twitter/')}>
                Twitter
              </LinkAccountButton>
            ) : (
              <LinkAccountButton
                style={{
                  color: props.user.providers.twitterId
                    ? 'var(--color-blue-l)'
                    : '',
                }}
              >
                Twitter
              </LinkAccountButton>
            )}
          </OAuthAccounts>
          {props.userURLs &&
            props.userURLs.length > 0 && (
              <URLList
                userURLs={props.userURLs}
                user={props.user}
                setUser={props.setUser}
              />
            )}
        </React.Fragment>
      ) : (
        <div />
      )}
    </ProfileContent>
  );
};

export default Profile;
