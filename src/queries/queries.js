import { gql } from '@apollo/client';

const GET_ALL_BORROWED_CARS = gql`
  query getAllBorrowedCars($userId: ID!) {
    user(id: $userId) {
      id
      borrowedCars {
        id
        startDate
        endDate
        car {
          id
          carClass
          benefits
          model
          brand {
            name
          }
          picturePath {
            url
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
      borrowedCars {
        id
        startDate
        endDate
        car {
          id
          carClass
          benefits
          model
          brand {
            name
          }
          picturePath {
            url
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
      borrowedCars {
        id
        startDate
        endDate
        car {
          id
          carClass
          benefits
          model
          brand {
            name
          }
          picturePath {
            url
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
      picturePath {
        url
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
      borrowedCars {
        id
        startDate
        endDate
        car {
          id
          carClass
          benefits
          model
          brand {
            name
          }
          picturePath {
            url
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
      }
    }
  }
`;

const GET_CAR = gql`
  query GetCar($carId: ID!) {
    car(id: $carId) {
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
      picturePath {
        url
      }
      location
      price
      comments {
        id
        text
        user {
          id
          firstName
          lastName
        }
        car {
          id
          model
        }
        rating
        createdAt
      }
    }
  }
`;

export {
  GET_ALL_BORROWED_CARS,
  GET_ALL_USERS,
  GET_USER,
  ALL_CARS,
  GET_CURRENT_USER,
  GET_BRANDS,
  GET_CAR
};
