import React from 'react';
import Home from './components/pages/home/Home';
import { Route, Routes } from 'react-router';
import CarDetails from './components/carDetails/CarDetails';
import Users from './components/users/Users';
import User from './components/user/User';
import Rentals from './components/rentals/Rentals';
import styles from './App.module.scss';
import CarState from './context/car/CarState';
import Bars from './components/bars/Bars';
import Registration from './components/auth/Registration';
import AlertState from './context/alert/AlertState';
import Alerts from './components/alerts/Alerts';
import Login from './components/auth/Login';
import ReturnCars from './components/pages/returnCars/ReturnCars';
import { createUploadLink } from 'apollo-upload-client';
import {
  ApolloClient,
  InMemoryCache,
  // HttpLink,
  ApolloProvider,
  ApolloLink
  // concat
} from '@apollo/client';
import AuthState from './context/auth/AuthState';
import { loadUser } from './context/auth/AuthState';
import AddCar from './components/pages/addCar/AddCar';
import Book from './components/pages/book/Book';
import Bookings from './components/pages/bookings/Bookings';
import Rent from './components/pages/rent/Rent';
import UpdateBooking from './components/pages/updateBooking/UpdateBooking';

const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/'
});
// const URL = 'https://desolate-spire-04068.herokuapp.com';
// const URL = 'http://localhost:5000';

const authenticationLink = new ApolloLink((operation, forward) => {
  const token = loadUser();

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  });
  return forward(operation);
});

// const httpLink = new HttpLink({
//   uri: URL
// });

// const client = new ApolloClient({
//   link: concat(authenticationLink, httpLink),
//   cache: new InMemoryCache()
// });

const client = new ApolloClient({
  link: ApolloLink.from([authenticationLink, uploadLink]),
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthState>
        <CarState>
          <AlertState>
            <div className={styles.app}>
              <Alerts />
              <Bars />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-car" element={<AddCar />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="login" element={<Login />} />
                <Route path="/cars/:carId" element={<CarDetails />} />
                <Route path="/return-car" element={<ReturnCars />} />
                <Route path="/return-car/:userId" element={<ReturnCars />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/bookings/:userId" element={<Rent />} />
                <Route path="/book-car/:carId" element={<Book />} />
                <Route path="/update-booking/:userId" element={<UpdateBooking />} />
                <Route path="/rentals" element={<Rentals />} />
                <Route path="/users/:userId" element={<User />} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </div>
          </AlertState>
        </CarState>
      </AuthState>
    </ApolloProvider>
  );
};

export default App;
