import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import store from './lib/store-create';
import ConnectedApp, { App, mapStateToProps } from './App';
import Login from './components/login';

describe('App component', () => {
  const wrapper = mount(
    <Router>
      <App />
    </Router>
  );
  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
  wrapper.unmount();
});

describe('Connected App component', () => {
  it('renders Connected App and Login', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ConnectedApp />
        </Router>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Login).length).toEqual(1);
    wrapper.unmount();
  });
});

describe('Testing mapStateToProps directly', () => {
  it('returns an object with a role string', () => {
    const state = {
      userProfile: {
        role: 'User',
      },
    };
    const output = mapStateToProps(state);
    expect(output).toEqual({ userRole: 'User' });
  });
});
