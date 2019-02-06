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
    const visitorURLsWithHash = response.data.urls.map(url => ({
      ...url,
      hash: Buffer.from(url._id.toString(), 'binary').toString('base64'),
    }));
    setReturnVisitorURLs(visitorURLsWithHash);
  };

  useEffect(() => {
    const visitorURLs = cookies.get('visitorURLs');
    if (visitorURLs && visitorURLs.length > 0) {
      fetchURLs(visitorURLs);
    } else if (!visitorURLs) {
      cookies.set('visitorURLs', [], { path: '/' });
    }
  }, []);

  return (
    <StyledHome>
      <H1>Welcome to Lionly</H1>
      <H2>Enter a url to shorten it!</H2>
      <CenterContent>
        <URLField setMetadata={setMetadata} cookies={cookies} />
        <LinkPreview metadata={metadata} />
      </CenterContent>
      {returnVisitorURLs &&
        returnVisitorURLs.length > 0 &&
        returnVisitorURLs
          .sort((a, b) => b._id - a._id)
          .map(returnVisitorURL => (
            <LinkPreview
              metadata={returnVisitorURL}
              key={returnVisitorURL.hash}
            />
          ))}
    </StyledHome>
  );
};

export default Home;
