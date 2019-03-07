import React, { useRef } from 'react';
import styled from 'styled-components';
import { truncate } from '../../lib/util';

const InlineField = styled.div`
  display: flex;
  align-items: center;
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

function LinkPreview({ metadata }) {
  const { image, title, description, url, author, publisher, hash } = metadata;
  const isYouTubeVideo = author && publisher && url;
  const shortenedURLRef = useRef(null);

  const copyToClipboard = e => {
    shortenedURLRef.current.select();
    document.execCommand('copy');
    e.target.focus();
  };

  const embedYouTubeVideo = () => {
    const id = url.split('?v=')[1];
    const embedLink = 'https://www.youtube.com/embed/' + id;
    return (
      <iframe
        id="preview-iframe"
        src={embedLink}
        title="youtube-video-preview"
        width="560"
        height="315"
        frameBorder="0"
        allowFullScreen
      />
    );
  };

  return (
    <div>
      {image &&
        !isYouTubeVideo && (
          <img
            src={image}
            alt="site logo for submitted url"
            style={{ maxWidth: '200px' }}
          />
        )}
      {isYouTubeVideo && <div>{author}</div>}
      {title && (
        <a
          href={url}
          target="_#"
          rel="noopener noreferrer"
          style={{ display: 'block' }}
        >
          {truncate(title, 108)}
        </a>
      )}
      {url && (
        <a
          href={url}
          target="_#"
          rel="noopener noreferrer"
          style={{ display: 'block' }}
        >
          {truncate(url, 108)}
        </a>
      )}
      {description &&
        !isYouTubeVideo && <div>{truncate(description, 255)}</div>}
      {isYouTubeVideo && embedYouTubeVideo()}
      {hash && (
        <InlineField>
          <a
            href={`${process.env.REACT_APP_DOMAIN}/${hash}`}
            target="_#"
            rel="noopener noreferrer"
          >
            <input
              ref={shortenedURLRef}
              value={`${process.env.REACT_APP_DOMAIN}/${hash}`}
              style={{ cursor: 'pointer' }}
              readOnly
            />
          </a>
          <Button onClick={copyToClipboard}>Copy</Button>
        </InlineField>
      )}
    </div>
  );
}

export default LinkPreview;
