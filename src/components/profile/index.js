import React from 'react';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';

const Profile = user => {
  const linkAccount = accountHref => {
    const cookies = new Cookies();
    cookies.set(
      'userCookie',
      jwt.sign(user, process.env.REACT_APP_SECRET_KEY),
      { path: '/' }
    );

    window.location.href = accountHref;
  };
  console.log('user: ', user);

  return (
    <div>
      <div>Welcome to your Lionly profile, {user.username}</div>
      {user.providers === undefined && <div>Link your accounts</div>}
      {user.providers.facebookId === undefined && (
        <div onClick={() => linkAccount('/auth/facebook/')}>Facebook</div>
      )}
      {user.providers.googleId === undefined && (
        <div onClick={() => linkAccount('/auth/google/')}>Google</div>
      )}
    </div>
  );
};

export default Profile;
