import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthState from '../../../context/auth/AuthState';
import AlertState from '../../../context/alert/AlertState';
import CarState from '../../../context/car/CarState';
import Login from '../Login';
import Registration from '../Registration';
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

it('renders Login component', async () => {
  render(
    <ApolloProvider client={client}>
      <MemoryRouter initialEntries={['/login']}>
        <AuthState>
          <AlertState>
            <CarState>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            </CarState>
          </AlertState>
        </AuthState>
      </MemoryRouter>
    </ApolloProvider>
  );
  const loginElement = screen.getByText(/account login/i);
  expect(await loginElement).toBeInTheDocument();
});

it('renders Registration component', async () => {
    render(
      <ApolloProvider client={client}>
        <MemoryRouter initialEntries={['/registration']}>
          <AuthState>
            <AlertState>
              <CarState>
                <Routes>
                  <Route path="/registration" element={<Registration />} />
                </Routes>
              </CarState>
            </AlertState>
          </AuthState>
        </MemoryRouter>
      </ApolloProvider>
    );
    const loginElement = screen.getByText(/account register/i);
    expect(await loginElement).toBeInTheDocument();
  });
