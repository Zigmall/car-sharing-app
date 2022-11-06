import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthState from '../../../context/auth/AuthState';
import AlertState from '../../../context/alert/AlertState';
import CarState from '../../../context/car/CarState';
import BorrowActionButton from '../BorrowActionButton';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
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

it('renders BorrowActionButton component', async () => {
  render(
    <ApolloProvider client={client}>
      <MemoryRouter initialEntries={['/']}>
        <AuthState>
          <AlertState>
            <CarState>
              <Routes>
                <Route path="/" element={<BorrowActionButton carId={'123'} />} />
              </Routes>
            </CarState>
          </AlertState>
        </AuthState>
      </MemoryRouter>
    </ApolloProvider>
  );
  const borrowActionButtonElement = screen.getByText(/order/i);
  expect(await borrowActionButtonElement).toBeInTheDocument();
});
