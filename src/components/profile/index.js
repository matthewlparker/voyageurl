import React from 'react';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
import styled from 'styled-components/macro';
import URLField from '../url-field';
import URLList from '../url-list';

const cookies = new Cookies();

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LinkAccountButton = styled.div`
  background: white;
  padding: var(--pad);
  display: flex;
  align-content: center;
  cursor: pointer;
  width: max-content;
  border-radius: 5px;
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
        <div>
          <div>Welcome to your Lionly profile, {props.user.username}</div>
          <URLField
            user={props.user}
            cookies={cookies}
            setUser={props.setUser}
          />
          {props.user.providers === undefined && <div>Link your accounts</div>}
          {props.user.providers.facebookId === undefined ? (
            <LinkAccountButton onClick={() => linkAccount('/auth/facebook/')}>
              Facebook
            </LinkAccountButton>
          ) : (
            <LinkAccountButton>Facebook - Linked</LinkAccountButton>
          )}
          {props.user.providers.googleId === undefined && (
            <LinkAccountButton onClick={() => linkAccount('/auth/google/')}>
              Google
            </LinkAccountButton>
          )}
          {props.user.providers.githubId === undefined && (
            <LinkAccountButton onClick={() => linkAccount('/auth/github/')}>
              Github
            </LinkAccountButton>
          )}
          {props.user.providers.twitterId === undefined && (
            <LinkAccountButton onClick={() => linkAccount('/auth/twitter/')}>
              Twitter
            </LinkAccountButton>
          )}
          {props.userURLs &&
            props.userURLs.length > 0 && (
              <URLList
                userURLs={props.userURLs}
                user={props.user}
                setUser={props.setUser}
              />
            )}
        </div>
      ) : (
        <div />
      )}
    </ProfileContent>
  );
};

export default Profile;
