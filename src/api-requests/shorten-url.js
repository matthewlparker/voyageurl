export const shortenUrl = async urlData => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(urlData),
  };
  const result = await fetch(
    `${process.env.REACT_APP_DOMAIN}/shorten`,
    settings
  )
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(err => {
      console.log(err);
    });
  return result;
};
