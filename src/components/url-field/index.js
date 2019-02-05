import React, { useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { shortenUrl, fetchMetadata } from './api-requests';
import isUrl from 'is-url';
import url from 'url';

const Input = styled.input`
  border: 1px solid black;
  padding: 0.5em;
  &:focus {
    border: 1px solid black;
  }
`;
const InlineField = styled.div`
  display: grid;
  grid-auto-flow: column;
`;
const Button = styled.div`
  display: flex;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
  width: 75px;
  padding: 0.5em;
  cursor: pointer;
`;

function URLField(props) {
  const [input, setInput] = useState({
    string: '',
    state: 'original',
  });
  const textAreaRef = useRef(null);

  const handleChange = e => {
    setInput({ string: e.target.value, state: 'original' });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const urlString = url.parse(input.string).protocol
      ? input.string
      : `http://${input.string}`;
    if (isUrl(urlString)) {
      shortenUrl(urlString, setInput, props.cookies);
      fetchMetadata(props, urlString);
    }
  };

  const copyToClipboard = e => {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setInput({ ...input, state: 'copied' });
  };

  return (
    <InlineField>
      <form onSubmit={handleSubmit}>
        <InlineField>
          <Input
            type="text"
            ref={textAreaRef}
            onChange={handleChange}
            value={input.string}
          />
          {input.state === 'original' && (
            <Button onClick={handleSubmit}>Shorten</Button>
          )}
        </InlineField>
      </form>
      {input.state !== 'original' && (
        <Button onClick={copyToClipboard}>
          {input.state === 'copied' ? 'Copied!' : 'Copy'}
        </Button>
      )}
    </InlineField>
  );
}

export default URLField;
