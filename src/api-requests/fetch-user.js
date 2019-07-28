// import jwt from 'jsonwebtoken';

export const fetchUser = async id => {
  const result = await fetch(`${process.env.REACT_APP_DOMAIN}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('userToken'),
    },
    body: JSON.stringify({ id }),
  })
    .then(res => res.json())
    .then(json => {
      // const newJWT = jwt.sign(json, process.env.REACT_APP_SECRET_KEY);
      // localStorage.setItem('userToken', newJWT);
      return json;
    })
    .catch(err => console.log('fetch user error: ', err));
  return result;
};
