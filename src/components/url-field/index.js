import React, { useRef, useState } from 'react';
import styled from 'styled-components/macro';
import parseDomain from 'parse-domain';
import isURL from 'validator/lib/isURL';
import url from 'url';
import { addURLToLocalStorage } from '../../lib/util';
import { fetchUser } from '../../api-requests/fetch-user';
import { shortenUrl } from '../../api-requests/shorten-url';
import { fetchMetadata } from '../../api-requests/fetch-metadata';

const StyledForm = styled.form`
  width: 100%;
  max-width: 600px;
`;
const InlineField = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const Input = styled.input`
  font-size: 18px;
  padding: 0.5em;
  height: 60px;
  background: white;
  width: 100%;
  border: 1px solid var(--color-orange-l);
  border-radius: 2.5px 0 0 2.5px;
  &:focus {
    border: 1px solid var(--color-orange);
    background: var(--color-orange-pale);
  }
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 75px;
  max-width: 75px;
  font-size: var(--font-s);
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  color: white;
  background: var(--color-orange-l);
  padding: 0.5em;
  border: 1px solid var(--color-orange-l);
  text-transform: uppercase;
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
    const visitorURLs = JSON.parse(localStorage.getItem('visitorURLs'));
    if (!visitorURLs) {
      localStorage.setItem('visitorURLs', JSON.stringify([]));
    }

    const urlString = url.parse(input.string).protocol
      ? input.string
      : `http://${input.string}`;
    if (isURL(urlString) && parseDomain(urlString)) {
      const urlData = {
        urlString,
        user: props.user !== 'visitor' ? props.user : undefined,
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
          if (props.user && props.user !== 'visitor') {
            fetchUser(props.user._id).then(result => props.setUser(result));
          }
          fetchMetadata(shortenURLResult).then(metadataResult => {
            const urlData = {
              ...metadataResult.metadata,
              hash: shortenURLResult.hash,
            };
            if (props.user === 'visitor') {
              props.setURLs(addURLToLocalStorage(urlData));
            }
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
      <StyledForm onSubmit={handleSubmit}>
        <InlineField>
          <Input
            type="text"
            ref={textAreaRef}
            onChange={handleChange}
            value={input.string}
            placeholder="Enter a URL to shorten it"
          />
          {input.state === 'original' && (
            <Button onClick={handleSubmit}>Shorten</Button>
          )}
        </InlineField>
      </StyledForm>
      {input.state !== 'original' && (
        <Button onClick={copyToClipboard}>
          {input.state === 'copied' ? 'Copied!' : 'Copy'}
        </Button>
      )}
    </InlineField>
  );
}

export default URLField;
