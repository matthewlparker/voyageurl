import React from 'react';
import { shallow } from 'enzyme';
import Auth from '../../auth/auth.js';
import Header from './index';

describe('Header component', () => {
  it('renders', () => {
    const auth = new Auth();
    const wrapper = shallow(<Header auth={auth} />);
    expect(wrapper).toMatchSnapshot();
  });
});
