import { gql } from '@apollo/client';

const DELETE_USER = gql`
  mutation Mutation($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      success
      message
      id
    }
  }
`;

const UPDATE_USER = gql`
  mutation ($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        firstName
        lastName
      }
      message
      success
    }
  }
`;

const UPDATE_MY_PERSONAL_DATA = gql`
  mutation ($input: UpdateMyPersonalDataInput!) {
    updateMyPersonalData(input: $input) {
      user {
        firstName
        lastName
      }
      message
      success
    }
  }
`;

const LOG_IN = gql`
  mutation ($input: LogInInput!) {
    logIn(input: $input) {
      message
      success
      token
      currentUser {
        id
        firstName
        lastName
        email
        isAdmin
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
  }
`;

const RETURN_CAR = gql`
  mutation ReturnCar($returnCarId: ID!) {
    returnCar(id: $returnCarId) {
      success
      message
      borrowedCar {
        id
        startDate
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
        }
      }
    }
  }
`;

const BORROW_CAR = gql`
  mutation BorrowCar($borrowCarId: ID!) {
    borrowCar(id: $borrowCarId) {
      success
      message
      borrowedCar {
        id
        car {
          id
          brand {
            name
          }
          model
        }
        borrower {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

const CREATE_CAR = gql`
  mutation CreateCar($input: CreateCarInput!) {
    createCar(input: $input) {
      success
      message
      car {
        model
        carClass
        brand {
          id
          name
        }
        id
      }
    }
  }
`;

export {
  DELETE_USER,
  UPDATE_USER,
  LOG_IN,
  RETURN_CAR,
  BORROW_CAR,
  UPDATE_MY_PERSONAL_DATA,
  CREATE_CAR
};
