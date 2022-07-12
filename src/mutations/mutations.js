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
        isAdmin
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

export { DELETE_USER, UPDATE_USER, LOG_IN };
