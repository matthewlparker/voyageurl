import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dropdown />, div);
  ReactDOM.unmountComponentAtNode(div);
});
