import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../Search';
import UserGroup from '../UserGroup';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthState from '../../../context/auth/AuthState';
import CarState from '../../../context/car/CarState';
import AlertState from '../../../context/alert/AlertState';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  ApolloLink,
  concat
} from '@apollo/client';

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
  password: 'test12',
  firstName: 'John',
  lastName: 'Doe',
  avatar: {
    color: '#000000'
  }
};

test('renders Search component', () => {
  render(<Search />);
  const searchElement = screen.getByPlaceholderText(/search/i);
  expect(searchElement).toBeInTheDocument();
});

test('renders UserGroup component', () => {
  render(
      <ApolloProvider client={client}>
            <AlertState>
              <UserGroup user={user} onLogout={logout} />
            </AlertState>
      </ApolloProvider>
  );
  const userGroupElement = screen.getByText(/john/i);
  expect(userGroupElement).toBeInTheDocument(); 
});
