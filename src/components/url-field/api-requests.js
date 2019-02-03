import validUrl from 'valid-url';

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

export const shortenUrl = (props, urlString) => {
  if (validUrl.isUri(urlString)) {
    fetch(`${process.env.REACT_APP_DOMAIN}/shorten`, {
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
        props.setUrl({
          original: res.url,
          shortened: `${process.env.REACT_APP_DOMAIN}/${res.hash}`,
        });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    console.log('Invalid url');
  }
};
