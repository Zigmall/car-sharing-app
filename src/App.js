import React from 'react';
import Home from './pages/home/Home';
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
import ReturnCars from './pages/returnCars/ReturnCars';
import Rents from './pages/rents/Rents';
import CheckAndReturn from './pages/checkAndReturn/CheckAndReturn';
import { createUploadLink } from 'apollo-upload-client';
import ReturnSummary from './pages/rentSummary/ReturnSummary';
import AuthState from './context/auth/AuthState';
import { loadUser } from './context/auth/AuthState';
import AddCar from './pages/addCar/AddCar';
import Book from './pages/book/Book';
import Bookings from './pages/bookings/Bookings';
import Rent from './pages/rent/Rent';
import UpdateBooking from './pages/updateBooking/UpdateBooking';
import HandlingOverCard from './pages/handlingOverCard/HandlingOverCard';
import MyBookings from './pages/myBookings/MyBookings';
import EditCar from './pages/editCar/EditCar';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink
  // concat
} from '@apollo/client';

const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/'
});
// const URL = 'https://desolate-spire-04068.herokuapp.com';

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
                <Route path="/edit-car/:carId" element={<EditCar />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="login" element={<Login />} />
                <Route path="/cars/:carId" element={<CarDetails />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/bookings/:userId" element={<Rent />} />
                <Route path="/book-car/:carId" element={<Book />} />
                <Route path="/update-booking/:userId" element={<UpdateBooking />} />
                <Route path="/all-cars" element={<Rentals />} />
                <Route path="/users/:userId" element={<User />} />
                <Route path="/users" element={<Users />} />
                <Route path="/rents/" element={<Rents />} />
                <Route path="/rents/:rentId" element={<CheckAndReturn />} />
                <Route path="/rents/handling-over-card/:rentId" element={<HandlingOverCard />} />
                <Route path="/rent-summary/:rentId" element={<ReturnSummary />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/return-car" element={<ReturnCars />} />
                <Route path="/return-car/:userId" element={<ReturnCars />} />
              </Routes>
            </div>
          </AlertState>
        </CarState>
      </AuthState>
    </ApolloProvider>
  );
};

export default App;
