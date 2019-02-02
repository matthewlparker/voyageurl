import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

const Input = styled.input`
  border: 1px solid black;
  padding: 0.5em;
  &:focus {
    border: 1px solid black;
  }
`;
// const usePostToDatabase = url => {
//   let [apiResponse, setApiResponse] = useState();
//   fetch(`${process.env.REACT_APP_DOMAIN}/api`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(url),
//   })
//     .then(res => res.json())
//     .then(res => {
//       setApiResponse(res);
//     })
//     .catch(err => {
//       setApiResponse(err);
//     });
// };

function URLField(props) {
  let [url, setUrl] = useState('');

  const handleChange = e => {
    setUrl(e.target.value);
  };

  const useFetch = e => {
    e.preventDefault();
    console.log('url: ', url);
    fetch(`${process.env.REACT_APP_DOMAIN}/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
      }),
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log('url: ', url);
  });

  return (
    <form onSubmit={useFetch}>
      <Input type="text" onChange={handleChange} />
    </form>
  );
}

export default URLField;
