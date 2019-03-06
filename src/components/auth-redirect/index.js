import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { fetchUser } from '../../api-requests/fetch-user';
import jwt from 'jsonwebtoken';

const AuthRedirect = ({ user, setUser }) => {
  useEffect(() => {
    const decodedUser = jwt.verify(user, process.env.REACT_APP_SECRET_KEY);
    if (decodedUser) {
      fetchUser(decodedUser._id, setUser);
    }
  }, []);

  let authorizedUser;
  if (user && user.username) {
    authorizedUser = user.username
      .split(' ')
      .join('')
      .toLowerCase();
  }
  console.log('authRedirect: ', authorizedUser);
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
