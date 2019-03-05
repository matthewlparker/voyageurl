import jwt from 'jsonwebtoken';

export const fetchUser = (id, setUser) => {
  fetch(`${process.env.REACT_APP_DOMAIN}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then(res => res.json())
    .then(res => {
      console.log('fetch user res: ', res);
      const newJWT = jwt.sign(res, process.env.REACT_APP_SECRET_KEY);
      localStorage.setItem('userToken', newJWT);
      setUser(res);
    })
    .catch(err => console.log('fetch user error: '));
};
