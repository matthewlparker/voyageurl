import React, { useState } from 'react';
import { shortenUrl, fetchMetadata } from './api-requests';
import styled from 'styled-components/macro';

const Input = styled.input`
  border: 1px solid black;
  padding: 0.5em;
  &:focus {
    border: 1px solid black;
  }
`;

function URLField(props) {
  let [url, setUrl] = useState('');

  const handleChange = e => {
    setUrl(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    shortenUrl(props, url);
    fetchMetadata(props, url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" onChange={handleChange} value={url} />
    </form>
  );
}

export default URLField;
