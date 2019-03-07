import React from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0% {
    opacity: .2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: .2;
  }
`;

const Loading = styled.div`
  span {
    animation-name: ${blink};
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  span:nth-child(2) {
    animation-delay: 0.2s;
  }

  span:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const LoadingEllipsis = () => (
  <Loading>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </Loading>
);

export default LoadingEllipsis;
