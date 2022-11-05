import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Search from '../Search';
import UserGroup from '../UserGroup';
import CarState from '../../../context/car/CarState';
import AlertState from '../../../context/alert/AlertState';
import AuthState from '../../../context/auth/AuthState';
import TopBar from '../TopBar';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  ApolloLink,
  concat
} from '@apollo/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const URL = 'http://localhost:5000';

const httpLink = new HttpLink({
  uri: URL
});
const authenticationLink = new ApolloLink((operation, forward) => {
  const token = loadUser();

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  });
  return forward(operation);
});
const client = new ApolloClient({
  link: concat(authenticationLink, httpLink),
  cache: new InMemoryCache()
});

const logout = jest.fn();
const user = {
  id: '1',
  name: 'test',
  email: 'test1',
  firstName: 'John',
  lastName: 'Doe',
  avatar: {
    color: '#000000'
  }
};

it('renders Search component', () => {
  render(<Search />);
  const searchElement = screen.getByPlaceholderText(/search/i);
  expect(searchElement).toBeInTheDocument();
});

it('checks if username of logged in user is displayed ', () => {
  render(
    <AlertState>
      <UserGroup user={user} onLogout={logout} />
    </AlertState>
  );
  const userGroupElement = screen.getByText(/john/i);
  expect(userGroupElement).toBeInTheDocument();
});

it('checks if user can see login text', () => {
  render(
    <MemoryRouter initialEntries={['/user']}>
      <AlertState>
        <Routes>
          <Route path="/user" element={<UserGroup onLogout={logout} />} />
        </Routes>
      </AlertState>
    </MemoryRouter>
  );
  const loginElement = screen.getByText(/login/i);
  expect(loginElement).toBeInTheDocument();
});

it('checks if user can see logout text', () => {
  render(
    <AlertState>
      <TopBar user={user} onLogout={logout} />
    </AlertState>
  );
  const logoutElement = screen.getByText(/john/i);
  const searchElement = screen.getByPlaceholderText(/search/i);
  expect(logoutElement && searchElement).toBeInTheDocument();
});

