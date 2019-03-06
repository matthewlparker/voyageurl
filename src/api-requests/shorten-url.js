import { fetchUser } from './fetch-user';
import { fetchMetadata } from './fetch-metadata';

export const shortenUrl = (urlString, setInput, props) => {
  let urlData;
  if (props.user) {
    urlData = {
      urlString,
      user: props.user,
    };
  } else {
    urlData = {
      urlString,
    };
  }
  console.log('shortenUrl: ', urlData);
  fetch(`${process.env.REACT_APP_DOMAIN}/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(urlData),
  })
    .then(res => res.json())
    .then(res => {
      if (props.user) {
        fetchUser(props.user._id, props.setUser);
      }
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
