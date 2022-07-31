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
      address {
        city
        country
        street
        houseNumber
        flatNumber
        postCode
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

const ALL_CARS = gql`
  query getCars {
    cars {
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
    }
  }
`;

const GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      id
      firstName
      lastName
      isAdmin
      email
      mobile
      address {
        city
        country
        street
        houseNumber
        flatNumber
        postCode
      }
      avatar {
        color
      }
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

const GET_BRANDS = gql`
  query Brands {
    brands {
      id
      name
      cars {
        id
        model
        year
        copies {
          id
          borrower {
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export { GET_ALL_BORROWED_CARS, GET_ALL_USERS, GET_USER, ALL_CARS, GET_CURRENT_USER, GET_BRANDS };
