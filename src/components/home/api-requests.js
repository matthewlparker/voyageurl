export const fetchMetadata = (props, urlString) => {
  fetch(`${process.env.REACT_APP_DOMAIN}/metadata`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      urlString,
    }),
  })
    .then(res => res.json())
    .then(res => {
      props.setMetadata(res.metadata);
    });
};

export const fetchURLs = async urls => {
  const response = await fetch(`${process.env.REACT_APP_DOMAIN}/urls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      urls,
    }),
  })
    .then(res => res.json())
    .then(res => {
      const visitorURLs = res.urls.map(url => {
        return {
          ...url,
          hash: Buffer.from(url._id.toString(), 'binary').toString('base64'),
        };
      });
      return visitorURLs;
    })
    .catch(err => {
      console.log(err);
    });
  return response;
};
