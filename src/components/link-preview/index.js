import React from 'react';

function LinkPreview({ metadata }) {
  const { image, title, description, url, author, publisher } = metadata;
  const isYouTubeVideo = author && publisher && url;

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
          {title}
        </a>
      )}
      {description && !isYouTubeVideo && <div>{description}</div>}
      {isYouTubeVideo && embedYouTubeVideo()}
    </div>
  );
}

export default LinkPreview;
