import React, { useState } from 'react';
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

  const useFetch = e => {
    e.preventDefault();
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
        console.log('res: ', res);
        props.setUrl({
          original: res.url,
          shortened: `${process.env.REACT_APP_DOMAIN}/${res.hash}`,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={useFetch}>
      <Input type="text" onChange={handleChange} />
    </form>
  );
}

export default URLField;
