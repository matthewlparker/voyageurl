import React, { useState } from 'react';
import styled from 'styled-components/macro';

const StyledDatabaseRequest = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CenterText = styled.div`
  text-align: center;
`;

const PostButton = styled.div`
  border: 1px solid var(--color-blue-d);
  width: max-content;
  padding: 7px 15px;
  font-weight: 600;
  color: white;
  background-color: var(--color-blue);
  margin-bottom: 10px;
  border-radius: 2.5px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-blue-d);
  }
`;

const DatabaseRequest = () => {
  const [apiResponse, setApiResponse] = useState();
  const useShortenURL = () => {
    fetch(`${process.env.REACT_APP_DOMAIN}/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
  };
  const usePostToDatabase = () => {
    fetch(`${process.env.REACT_APP_DOMAIN}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Voyageurl MongoDB API',
        message: 'Connection Successful!',
      }),
    })
      .then(res => res.json())
      .then(res => {
        setApiResponse(res);
      })
      .catch(err => {
        setApiResponse(err);
      });
  };

  return (
    <StyledDatabaseRequest>
      <PostButton onClick={usePostToDatabase}>POST</PostButton>
      {apiResponse ? (
        <CenterText>
          <div>{apiResponse.title}</div>
          <div>{apiResponse.message}</div>
        </CenterText>
      ) : (
        <div />
      )}
    </StyledDatabaseRequest>
  );
};

export default DatabaseRequest;
