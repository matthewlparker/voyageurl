import React from 'react';
import styled from 'styled-components';

const ProviderButton = props => {
  const StyledButton = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 40px;
    background: #fff;
    border: 1px solid ${props.color};
    border-radius: 2.5px;
    &:hover {
      background: var(--color-orange-pale);
    }
  `;

  return (
    <StyledButton href={props.href}>
      <img
        src={props.svg}
        alt={props.alt}
        width={props.width}
        height={props.width}
      />
    </StyledButton>
  );
};

export default ProviderButton;
