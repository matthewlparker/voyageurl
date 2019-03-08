import jwt from 'jsonwebtoken';

export const postReorderedURLs = async (urls, userId) => {
  const reorderedURLs = urls.map(url => url._id);
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('userToken'),
    },
    body: JSON.stringify({ id: userId, urls: reorderedURLs }),
  };
  const result = await fetch(
    `${process.env.REACT_APP_DOMAIN}/user/reorder-urls`,
    settings
  )
    .then(res => res.json())
    .then(json => {
      const newJWT = jwt.sign(json, process.env.REACT_APP_SECRET_KEY);
      localStorage.setItem('userToken', newJWT);
      return json;
    })
    .catch(err => console.log('fetch user error: ', err));
  return result;
};
