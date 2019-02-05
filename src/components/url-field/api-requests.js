import { fetchURLs } from '../home/api-requests';

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

export const shortenUrl = (urlString, setInput, cookies) => {
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
      let visitorURLs = cookies.get('visitorURLs');
      if (visitorURLs && !visitorURLs.includes(res.hash)) {
        cookies.set('visitorURLs', [...visitorURLs, res.hash]);
        visitorURLs = cookies.get('visitorURLs');
      }
      if (visitorURLs && visitorURLs.length > 0) {
        fetchURLs(visitorURLs);
      }
      setInput({
        string: `${process.env.REACT_APP_DOMAIN}/${res.hash}`,
        state: 'shortened',
      });
    })
    .catch(err => {
      console.log(err);
    });
};
