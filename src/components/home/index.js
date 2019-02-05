import React, { useState, useEffect } from 'react';
import LinkPreview from '../link-preview';
import URLField from '../url-field';
import styled from 'styled-components/macro';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

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
  const [returnVisitorURLs, setReturnVisitorURLs] = useState([]);
  const [metadata, setMetadata] = useState({
    image: '',
    title: '',
    description: '',
    url: '',
  });

  const fetchURLs = async visitorURLs => {
    const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/urls`, {
      urls: visitorURLs,
    });
    console.log('response: ', response.data.urls);
    const visitorURLsWithHash = response.data.urls.map(url => ({
      ...url,
      hash: Buffer.from(url._id.toString(), 'binary').toString('base64'),
    }));
    console.log('visitorURLsWithHash: ', visitorURLsWithHash);
    setReturnVisitorURLs(visitorURLsWithHash);
  };

  useEffect(() => {
    const visitorURLs = cookies.get('visitorURLs');
    if (visitorURLs && visitorURLs.length > 0) {
      fetchURLs(visitorURLs);
    } else if (!visitorURLs) {
      cookies.set('visitorURLs', [], { path: '/' });
    }

    // fetchURLs(['MA==', 'MQ==']);

    // fetchURLs(['MA==', 'MQ==']).then(URLs => setReturnVisitorURLs(URLs));
  }, []);

  return (
    <StyledHome>
      <H1>Welcome to Voyageurl</H1>
      <H2>Enter a url to shorten it!</H2>
      <CenterContent>
        <URLField setMetadata={setMetadata} cookies={cookies} />
        <LinkPreview metadata={metadata} />
      </CenterContent>
      {returnVisitorURLs &&
        returnVisitorURLs.length > 0 &&
        returnVisitorURLs.map(returnVisitorURL => (
          <div key={returnVisitorURL.hash}>
            <a
              href={returnVisitorURL.url}
              target="_#"
              rel="noopener noreferrer"
            >
              {`${process.env.REACT_APP_DOMAIN}/${returnVisitorURL.hash}`}
            </a>
          </div>
        ))}
    </StyledHome>
  );
};

export default Home;
