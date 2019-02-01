import React from 'react';
import { mount } from 'enzyme';
import Auth from '../../auth/auth.js';
import Login from './index';

describe('Login component', () => {
  const auth = new Auth();
  const wrapper = mount(<Login auth={auth} />);
  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
