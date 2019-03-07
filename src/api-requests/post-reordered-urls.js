import jwt from 'jsonwebtoken';

export const postReorderedURLs = (urls, userId, setUser) => {
  const reorderedURLs = urls.map(url => url._id);
  fetch(`${process.env.REACT_APP_DOMAIN}/user/reorder-urls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: userId, urls: reorderedURLs }),
  })
    .then(res => res.json())
    .then(res => {
      const newJWT = jwt.sign(res, process.env.REACT_APP_SECRET_KEY);
      localStorage.setItem('userToken', newJWT);
      setUser(res);
    })
    .catch(err => console.log('fetch user error: ', err));
};
