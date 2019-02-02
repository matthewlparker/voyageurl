import React from 'react';

function LinkPreview(props) {
  return (
    <div>
      <div>Title: {props.preview.title}</div>
      <div>Description: {props.preview.description}</div>
      <div>Url: {props.preview.url}</div>
    </div>
  );
}

export default LinkPreview;
