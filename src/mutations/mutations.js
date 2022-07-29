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
  }
`;

const RETURN_CAR = gql`
  mutation ReturnCarCopy($returnCarCopyId: ID!) {
    returnCarCopy(id: $returnCarCopyId) {
      id
      borrower {
        id
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
      id
      car {
        copies {
          id
          borrower {
            id
          }
        }
      }
    }
  }
`;

const BORROW_CAR = gql`
  mutation BorrowCarCopy($carCopyId: ID!) {
    borrowCarCopy(id: $carCopyId) {
      id
      borrower {
        borrowedCarCopies {
          id
          car {
            copies {
              id
            }
          }
        }
      }
    }
  }
`;

export { DELETE_USER, UPDATE_USER, LOG_IN, RETURN_CAR, BORROW_CAR, UPDATE_MY_PERSONAL_DATA };
