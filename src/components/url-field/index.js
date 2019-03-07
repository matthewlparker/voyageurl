import React, { useRef, useState } from 'react';
import styled from 'styled-components/macro';
import parseDomain from 'parse-domain';
import isURL from 'validator/lib/isURL';
import url from 'url';
import { addURLToCookie } from '../../lib/util';
import { fetchUser } from '../../api-requests/fetch-user';
import { shortenUrl } from '../../api-requests/shorten-url';
import { fetchMetadata } from '../../api-requests/fetch-metadata';

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
  border: 1px solid var(--color-orange);
  align-items: center;
  justify-content: center;
  width: 75px;
  padding: 0.5em;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: var(--color-orange);
  }
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

    const visitorURLs = props.cookies.get('visitorURLs');
    if (!visitorURLs) {
      props.cookies.set('visitorURLs', [], { path: '/' });
    }

    const urlString = url.parse(input.string).protocol
      ? input.string
      : `http://${input.string}`;
    if (isURL(urlString) && parseDomain(urlString)) {
      const urlData = {
        urlString,
        user: props.user,
      };
      shortenUrl(urlData)
        .then(result => {
          setInput({
            string: `${process.env.REACT_APP_DOMAIN}/${result.hash}`,
            state: 'shortened',
          });
          return result;
        })
        .then(shortenURLResult => {
          if (props.user) {
            fetchUser(props.user._id).then(result => props.setUser(result));
          }
          fetchMetadata(shortenURLResult).then(metadataResult => {
            const urlData = {
              ...metadataResult.metadata,
              hash: shortenURLResult.hash,
            };
            const managedURLs = addURLToCookie(urlData);
            props.setReturnVisitorURLs(managedURLs);
          });
        });
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
