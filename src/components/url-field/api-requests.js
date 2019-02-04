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

export const shortenUrl = (urlString, setInput) => {
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
      setInput({
        string: `${process.env.REACT_APP_DOMAIN}/${res.hash}`,
        state: 'shortened',
      });
    })
    .catch(err => {
      console.log(err);
    });
};
