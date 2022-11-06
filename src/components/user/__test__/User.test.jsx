import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CarState from '../../../context/car/CarState';
import AlertState from '../../../context/alert/AlertState';
import AuthState from '../../../context/auth/AuthState';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import User from '../User';

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
  firstName: 'John',
  lastName: 'Doe',
  avatar: {
    color: '#000000'
  }
};

it('checks if loading info is displayed', async () => {
  render(
    <ApolloProvider client={client}>
      <MemoryRouter >
        <AuthState>
          <CarState>
            <AlertState>
              <User />
            </AlertState>
          </CarState>
        </AuthState>
      </MemoryRouter>
    </ApolloProvider>
  );
  const userElement = screen.findByText(/loading/i);
  expect(await userElement).toBeInTheDocument();
});
