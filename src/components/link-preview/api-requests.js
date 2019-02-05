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

export const fetchURLs = (urls, setReturnVisitorURLs) => {
  fetch(`${process.env.REACT_APP_DOMAIN}/urls`, {
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
      const returnVisitorURLs = res.urls.map(url => {
        return {
          ...url,
          hash: Buffer.from(url._id.toString(), 'binary').toString('base64'),
        };
      });
      console.log('returnVisitorURLs: ', returnVisitorURLs);
      setReturnVisitorURLs(returnVisitorURLs);
    })
    .catch(err => {
      console.log(err);
    });
};
