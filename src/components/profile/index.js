import React from 'react';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';

const Profile = props => {
  const linkAccount = accountHref => {
    const cookies = new Cookies();
    cookies.set(
      'userCookie',
      jwt.sign(props.user, process.env.REACT_APP_SECRET_KEY),
      { path: '/' }
    );
    window.location.href = accountHref;
  };

  return (
    <div>
      <div>Welcome to your Lionly profile, {props.user.username}</div>
      {props.user.providers === undefined && <div>Link your accounts</div>}
      {props.user.providers.facebookId === undefined && (
        <div onClick={() => linkAccount('/auth/facebook/')}>Facebook</div>
      )}
      {props.user.providers.googleId === undefined && (
        <div onClick={() => linkAccount('/auth/google/')}>Google</div>
      )}
      {props.user.providers.githubId === undefined && (
        <div onClick={() => linkAccount('/auth/github/')}>Github</div>
      )}
      {props.user.providers.twitterId === undefined && (
        <div onClick={() => linkAccount('/auth/twitter/')}>Twitter</div>
      )}
    </div>
  );
};

export default Profile;
