export const fetchMetadata = async urlData => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ urlString: urlData.url }),
  };
  const result = await fetch(
    `${process.env.REACT_APP_DOMAIN}/metadata`,
    settings
  )
    .then(res => res.json())
    .then(json => {
      return json;
    });
  return result;
};
