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

      const visitorURLs = props.cookies.get('visitorURLs');
      // If metadata.hash is currently in visitorURLs array, move that entry to front of array
      const managedVisitorURLs = manageVisitorURLs(visitorURLs, metadata);
      const current = new Date();
      const nextYear = new Date();
      nextYear.setFullYear(current.getFullYear() + 1);
      props.cookies.set('visitorURLs', managedVisitorURLs, {
        path: '/',
        expires: nextYear,
      });
      if (props.setReturnVisitorURLs) {
        props.setReturnVisitorURLs(managedVisitorURLs);
      }
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
