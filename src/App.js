import React from 'react';
import Home from './components/pages/home/Home';
import { Route, Routes } from 'react-router';
import CarDetails from './components/carDetails/CarDetails';
import styles from './App.module.scss';
import CarState from './context/car/CarState';
import Bars from './components/bars/Bars';
import Registration from './components/auth/Registration';
import AlertState from './context/alert/AlertState';
import Alerts from './components/alerts/Alerts';
import Login from './components/auth/Login';
import { ApolloClient, InMemoryCache, HttpLink, gql, ApolloProvider } from '@apollo/client';
const URL = 'https://desolate-spire-04068.herokuapp.com';
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: URL
  })
});

const QUOTE_QUERY = gql`
  query getHello {
    hello
  }
`;

client.query({ query: QUOTE_QUERY }).then((result) => console.log('Result: ', result.data));

const App = () => {
  return (
    <ApolloProvider client={client}>
      <CarState>
        <AlertState>
          <div className={styles.app}>
            <Bars />
            <Alerts />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="login" element={<Login />} />
              <Route path="/cars/:carId" element={<CarDetails />} />
            </Routes>
          </div>
        </AlertState>
      </CarState>
    </ApolloProvider>
  );
};

export default App;
