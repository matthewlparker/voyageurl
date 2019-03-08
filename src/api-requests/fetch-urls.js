export const fetchURLs = async urls => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('userToken'),
    },
    body: JSON.stringify({ urls }),
  };
  const result = await fetch(
    `${process.env.REACT_APP_DOMAIN}/user-urls`,
    settings
  )
    .then(res => res.json())
    .catch(err => console.log('fetch user urls error: ', err));
  return result;
};
