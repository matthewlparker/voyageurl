import React from 'react';

function LinkPreview({ metadata }) {
  return (
    <div>
      {metadata.image && (
        <img
          src={metadata.image}
          alt="site logo for submitted url"
          style={{ maxWidth: '200px' }}
        />
      )}
      <div>Title: {metadata.title}</div>
      <div>Description: {metadata.description}</div>
      <div>Url: {metadata.url}</div>
    </div>
  );
}

export default LinkPreview;
