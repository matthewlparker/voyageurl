export const fetchURLs = async urls => {
  const settings = {
    method: 'POST',
    credentials: 'include',
  };
  const result = await fetch(
    `${process.env.REACT_APP_DOMAIN}/user/urls`,
    settings
  )
    .then(res => res.json())
    .catch(err => console.log('fetch user urls error: ', err));
  return result;
};
