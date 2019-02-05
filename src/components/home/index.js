import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LinkPreview from '../link-preview';
import URLField from '../url-field';
import styled from 'styled-components/macro';
import Cookies from 'universal-cookie';
import { fetchURLs } from './api-requests';
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

// const useFetch = () => {
//   const [returnVisitorURLs, setReturnVisitorURLs] = useState([]);

//   useEffect(async () => {
//     let visitorURLs = cookies.get('visitorURLs');
//     console.log('visitorURLs: ', visitorURLs);
//     if (!visitorURLs) {
//       cookies.set('visitorURLs', [], { path: '/' });
//       visitorURLs = cookies.get('visitorURLs');
//     }
//     if (visitorURLs.length > 0) {
//       try {
//         const response = await axios.post(
//           `${process.env.REACT_APP_DOMAIN}/urls`,
//           { urls: visitorURLs }
//         );
//         console.log('axios response: ', response);
//         setReturnVisitorURLs([response.data.urls]);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   }, []);
//   // console.log('returnVisitorURLs: ', returnVisitorURLs);
//   return returnVisitorURLs;
// };

const Home = () => {
  const [returnVisitorURLs, setReturnVisitorURLs] = useState([]);
  // const visitorURLs = useFetch();
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
  }, []);

  // useEffect(async () => {
  //   const visitorURLs = cookies.get('visitorURLs');
  //   if (visitorURLs && visitorURLs.length > 0) {
  //     const fetchedVisitorURLs = await fetchURLs(visitorURLs);
  //     setReturnVisitorURLs(fetchedVisitorURLs);
  //   } else {
  //     cookies.set('visitorURLs', [], { path: '/' });
  //   }
  // }, []);

  // useEffect(async () => {
  //   let visitorURLs = cookies.get('visitorURLs');
  //   if (!visitorURLs) {
  //     cookies.set('visitorURLs', [], { path: '/' });
  //     visitorURLs = cookies.get('visitorURLs');
  //   }
  //   if (visitorURLs.length > 0) {
  //     try {
  //       const response = await axios.post(
  //         `${process.env.REACT_APP_DOMAIN}/urls`,
  //         { urls: visitorURLs }
  //       );
  //       console.log('axios response: ', response);
  //       setReturnVisitorURLs([response.data.urls]);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   console.log('visitorURLs: ', visitorURLs);
  //   console.log('returnVisitorURLs: ', returnVisitorURLs);
  //   // if (visitorURLs && visitorURLs.length > 0) {
  //   //   try {
  //   //     const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/urls`, urls)
  //   //   }
  //   // }
  // }, []);

  // export const fetchURLs = async urls => {
  //   const response = await fetch(`${process.env.REACT_APP_DOMAIN}/urls`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       urls,
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       const visitorURLs = res.urls.map(url => {
  //         return {
  //           ...url,
  //           hash: Buffer.from(url._id.toString(), 'binary').toString('base64'),
  //         };
  //       });
  //       return visitorURLs;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   return response;
  // };

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
