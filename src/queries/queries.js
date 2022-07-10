import { gql } from '@apollo/client';

const GET_ALL_BORROWED_CARS = gql`
  query BorrowedCarCopies($userId: ID!) {
    user(id: $userId) {
      borrowedCarCopies {
        id
        car {
          id
          carClass
          benefits
          model
          brand {
            name
          }
          year
          property {
            seats
            doors
            trunk
            airConditioning
            manualGearBox
          }
          location
          price
          copies {
            id
            borrower {
              id
            }
          }
        }
      }
    }
  }
`;

const GET_ALL_USERS = gql`
  query AllUsers {
    allUsers {
      id
      firstName
      lastName
      email
      isAdmin
      mobile
      borrowedCarCopies {
        id
        car {
          brand {
            name
          }
          model
        }
      }
    }
  }
`;

const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      avatar {
        color
      }
      firstName
      lastName
      isAdmin
      borrowedCarCopies {
        id
        car {
          brand {
            name
          }
          model
        }
      }
    }
  }
`;

export { GET_ALL_BORROWED_CARS, GET_ALL_USERS, GET_USER };
