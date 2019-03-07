export const fetchURLs = (urls, setUserURLs) => {
  console.log('urls: ', urls);
  fetch(`${process.env.REACT_APP_DOMAIN}/user-urls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ urls }),
  })
    .then(res => res.json())
    .then(res => {
      setUserURLs(res);
    })
    .catch(err => console.log('fetch user urls error: ', err));
};
