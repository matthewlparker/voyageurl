import React, { useState } from 'react';
import validUrl from 'valid-url';
import styled from 'styled-components/macro';

const Input = styled.input`
  border: 1px solid black;
  padding: 0.5em;
  &:focus {
    border: 1px solid black;
  }
`;

function URLField(props) {
  let [urlString, setUrlString] = useState('');

  const handleChange = e => {
    setUrlString(e.target.value);
  };

  const fetchMetadata = () => {
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

  const handleSubmit = e => {
    e.preventDefault();
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
          fetchMetadata(urlString);
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

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" onChange={handleChange} />
    </form>
  );
}

export default URLField;
