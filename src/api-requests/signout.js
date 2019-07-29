export const signout = async () => {
  const settings = {
    method: 'POST',
    credentials: 'include',
  };
  const result = await fetch(
    `${process.env.REACT_APP_DOMAIN}/auth/signout`,
    settings
  )
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });
  return result;
};
