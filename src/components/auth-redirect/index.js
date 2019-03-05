import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import jwt from 'jsonwebtoken';

const AuthRedirect = ({ user, setUser }) => {
  useEffect(() => {
    // check for logged in user
    const decodedUser = jwt.verify(user, process.env.REACT_APP_SECRET_KEY);
    if (decodedUser) {
      setUser(decodedUser);
    }
  }, []);

  let authorizedUser;
  if (user && user.username) {
    authorizedUser = user.username
      .split(' ')
      .join('')
      .toLowerCase();
  }
  return (
    <div>
      {authorizedUser ? (
        <Redirect to={`/lion/${authorizedUser}`} />
      ) : (
        <div>Authorizing user...</div>
      )}
    </div>
  );
};

export default AuthRedirect;
