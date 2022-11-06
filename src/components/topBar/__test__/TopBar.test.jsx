import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Search from '../Search';
import UserGroup from '../UserGroup';
import AlertState from '../../../context/alert/AlertState';
import TopBar from '../TopBar';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

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

