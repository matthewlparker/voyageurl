import React from 'react';
import uuid from 'uuid/v4';
import styled from 'styled-components/macro';

const Button = styled.div`
  color: white;
  font-size: var(--font-m);
  border: none;
  white-space: nowrap;
`;

const Li = styled.li`
  display: flex;
  text-decoration: none;
  &:hover {
    background-color: #ddd;
  }
`;

const Ul = styled.ul`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: max-content;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const StyledDropdown = styled.div`
  position: relative;
  display: inline-block;
  &:hover {
    cursor: pointer;
  }
  &:hover ${Ul} {
    display: block;
  }
  &:hover ${Button} {
    color: #fafafa;
  }
`;

const Dropdown = ({ title, children }) => (
  <StyledDropdown>
    <Button>{title}</Button>
    <Ul>{children && children.map(child => <Li key={uuid()}>{child}</Li>)}</Ul>
  </StyledDropdown>
);

export default Dropdown;
