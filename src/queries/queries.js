import { gql } from '@apollo/client';

// const GET_ALL_BORROWED_CARS = gql`
//   query {
//     currentUser {
//       id
//       firstName
//       lastName
//       borrowedCarCopies {
//         id
//         car {
//           id
//           carClass
//           benefits
//           model
//           brand {
//             name
//           }
//           year
//           property {
//             seats
//             doors
//             trunk
//             airConditioning
//             manualGearBox
//           }
//           location
//           price
//           copies {
//             id
//             borrower {
//               id
//             }
//           }
//         }
//       }
//     }
//   }
// `;

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

export { GET_ALL_BORROWED_CARS };
