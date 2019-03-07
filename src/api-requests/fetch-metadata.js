export const fetchMetadata = async (urlData, props) => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ urlString: urlData.url }),
  };
  const data = await fetch(`${process.env.REACT_APP_DOMAIN}/metadata`, settings)
    .then(res => res.json())
    .then(json => {
      let { metadata } = json;
      metadata = { ...metadata, hash: urlData.hash };

      if (props && props.cookies) {
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
      }
      return json;
    });
  return data;
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
