export const shortenUrl = (urlString, setInput, props) => {
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
      fetchMetadata(res, props);
      setInput({
        string: `${process.env.REACT_APP_DOMAIN}/${res.hash}`,
        state: 'shortened',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchMetadata = (urlData, props) => {
  console.log('fetchMetadata urlData: ', urlData);
  fetch(`${process.env.REACT_APP_DOMAIN}/metadata`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      urlString: urlData.url,
    }),
  })
    .then(res => res.json())
    .then(res => {
      console.log('fetchMetadata res', res);
      let { metadata } = res;
      metadata = { ...metadata, hash: urlData.hash };

      let visitorURLs = props.cookies.get('visitorURLs');
      console.log('visitorURLs: ', visitorURLs);
      if (
        visitorURLs &&
        !visitorURLs.some(visitorURL => visitorURL.hash === metadata.hash)
      ) {
        if (visitorURLs.length === 5) {
          visitorURLs.pop();
        }
        visitorURLs.unshift(metadata);
        props.cookies.set('visitorURLs', visitorURLs);
      }
      if (metadata) {
        props.setMetadata(metadata);
      }
    });
};
