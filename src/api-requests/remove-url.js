import jwt from 'jsonwebtoken';

export const removeURL = async (urlId, userId) => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('userToken'),
    },
    body: JSON.stringify({ urlId, userId }),
  };
  const result = await fetch(
    `${process.env.REACT_APP_DOMAIN}/user/remove-url`,
    settings
  )
    .then(res => res.json())
    .then(json => {
      const newJWT = jwt.sign(json, process.env.REACT_APP_SECRET_KEY);
      localStorage.setItem('userToken', newJWT);
      return json;
    })
    .catch(err => console.log('removeURL error: ', err));
  return result;
};
