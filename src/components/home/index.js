import React, { useState, useEffect } from 'react';
import LinkPreview from '../link-preview';
import URLField from '../url-field';
import styled from 'styled-components/macro';

const StyledHome = styled.div`
  max-height: calc(100vh - 120px);
  padding-top: 60px;
`;

const H1 = styled.h1`
  text-align: center;
  font-size: 32px;
  margin-bottom: 10px;
`;

const H2 = styled.h2`
  text-align: center;
  font-size: 16px;
  margin-bottom: 10px;
`;

const CenterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const Home = () => {
  // let [originalUrl, setOriginalUrl] = useState('');
  // let [shortenedUrl, setShortenedUrl] = useState('');
  let [url, setUrl] = useState({ original: '', shortened: '' });
  let [preview, setPreview] = useState({});

  useEffect(() => {
    console.log('url: ', url);
    if (url.original) {
      let data = {
        key: process.env.REACT_APP_LINK_PREVIEW,
        q: url.original,
      };
      fetch('http://api.linkpreview.net/', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(res => {
          if (preview.url !== res.url) {
            setPreview(res);
          }
          console.log('res: ', res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
  return (
    <StyledHome>
      <H1>Welcome to Voyageurl</H1>
      <H2>Enter a url to shorten it!</H2>
      <CenterContent>
        <URLField setUrl={setUrl} />
        <a href={url.shortened} target="_blank" rel="noopener noreferrer">
          {url.shortened}
        </a>
        <LinkPreview preview={preview} />
      </CenterContent>
    </StyledHome>
  );
};

export default Home;
