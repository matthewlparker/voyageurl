import React, { useState, useEffect, useRef } from 'react';
import { fetchMetadata } from '../../api-requests/fetch-metadata';
import { removeURL } from '../../api-requests/remove-url';
import LoadingEllipsis from '../loading-ellipsis';
import { truncate } from '../../lib/util';
import styled from 'styled-components';

const URLCardContainer = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
`;

const URLCardTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

const URLCardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`;

const URLTitle = styled.div`
  font-size: var(--font-l);
  color: var(--color-grey);
`;

const URLString = styled.a`
  font-size: var(--font-s);
  color: var(--color-grey-l);
  padding: 8px 0 8px 0;
`;

const HashString = styled.a`
  input {
    font-size: var(--font-m);
    text-align: right;
    color: var(--color-orange-l);
    margin-right: 7px;
  }
`;

const CopyButton = styled.div`
  display: flex;
  border: 1px solid var(--color-orange);
  align-items: center;
  justify-content: center;
  width: 55px;
  font-size: var(--font-xs);
  font-family: Robot, sans-serif;
  font-weight: 700;
  padding: 0.5em;
  color: var(--color-orange-l);
  cursor: pointer;
  text-transform: uppercase;
  border-radius: calc(var(--pad) / 2);
  margin-left: var(--pad);
  &:hover {
    color: white;
    background-color: var(--color-orange);
  }
`;

const URLCard = props => {
  const [metadata, setMetadata] = useState();
  const shortenedURLRef = useRef(null);

  const copyToClipboard = e => {
    shortenedURLRef.current.select();
    document.execCommand('copy');
    e.target.focus();
  };
  const handleRemove = () => {
    removeURL(props.url._id, props.user._id).then(result =>
      props.setUser(result)
    );
  };

  useEffect(
    () => {
      if (props.isVisible && !metadata) {
        fetchMetadata(props.url).then(data => setMetadata(data.metadata));
      }
    },
    [props.isVisible]
  );

  return (
    <URLCardContainer>
      <URLCardTop>
        {metadata ? (
          <URLTitle>{truncate(metadata.title, 45)}</URLTitle>
        ) : (
          <LoadingEllipsis />
        )}
        <URLString href={props.url.url} target="_#" rel="noopener noreferrer">
          {truncate(props.url.url, 65)}
        </URLString>
      </URLCardTop>
      <URLCardBottom>
        <HashString href={props.url.url} target="_#" rel="noopener noreferrer">
          <input
            ref={shortenedURLRef}
            value={`${process.env.REACT_APP_DOMAIN}/${props.url.hash}`}
            style={{ cursor: 'pointer' }}
            readOnly
          />
        </HashString>
        <CopyButton onClick={handleRemove}>Remove</CopyButton>
        <CopyButton onClick={copyToClipboard}>Copy</CopyButton>
      </URLCardBottom>
    </URLCardContainer>
  );
};

export default URLCard;
