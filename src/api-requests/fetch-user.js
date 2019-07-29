export const fetchUser = async () => {
  const settings = {
    method: 'POST',
    credentials: 'include',
  };
  const result = await fetch(`${process.env.REACT_APP_DOMAIN}/user`, settings)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return false;
    });
  return result;
};
