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
      let { metadata } = res;
      metadata = { ...metadata, hash: urlData.hash };

      let visitorURLs = props.cookies.get('visitorURLs');
      // If metadata.hash is currently in visitorURLs array, move that entry to front of array
      const managedVisitorURLs = manageVisitorURLs(visitorURLs, metadata);
      props.cookies.set('visitorURLs', managedVisitorURLs);
      props.setReturnVisitorURLs(managedVisitorURLs);
    });
};

const manageVisitorURLs = (visitorURLs, metadata) => {
  if (
    visitorURLs.length > 1 &&
    visitorURLs.some(visitorURL => visitorURL.hash === metadata.hash)
  ) {
    visitorURLs = visitorURLs.filter(
      visitorURL => visitorURL.hash !== metadata.hash
    );
  }
  visitorURLs.unshift(metadata);
  if (visitorURLs.length > 5) {
    visitorURLs.pop();
  }
  return visitorURLs;
};
