import React from 'react';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
import styled from 'styled-components/macro';
import URLField from '../url-field';

const cookies = new Cookies();

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
    <div>
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
            props.userURLs.map(userURL => (
              <div>
                <div>
                  <a href={userURL.url} target="_#" rel="noopener noreferrer">
                    {userURL.url}
                  </a>
                </div>
                <div>
                  <a
                    href={`${process.env.REACT_APP_DOMAIN}/${userURL.hash}`}
                    target="_#"
                    rel="noopener noreferrer"
                  >
                    {process.env.REACT_APP_DOMAIN + '/' + userURL.hash}
                  </a>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Profile;
