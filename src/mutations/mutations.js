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
        id
        firstName
        lastName
        role
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
        id
        firstName
        lastName
        role
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
        role
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
            carClass {
              name
            }
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
          carClass {
            name
          }
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
        id
        model
        carClass {
          name
        }
        benefits
        year
        location
        price
        description
        brand {
          id
          name
        }
        picturePath {
          url
        }
        pictures {
          url
        }
        property {
          seats
          doors
          trunk
          engine
          airConditioning
          manualGearBox
        }
      }
    }
  }
`;

const SIGN_UP = gql`
  mutation SignUp($input: SignUp!) {
    signUp(input: $input) {
      success
      message
      token
      currentUser {
        id
        firstName
        lastName
        email
        borrowedCars {
          id
          startDate
          endDate
          car {
            id
            carClass {
              name
            }
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
        avatar {
          color
        }
      }
    }
  }
`;
const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      success
      message
      comment {
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

const UPLOAD_IMAGE = gql`
  mutation UploadImage($input: UploadImageInput!) {
    uploadImage(input: $input) {
      success
      message
      imageUrl {
        url
      }
    }
  }
`;

const BOOK_CAR = gql`
  mutation BookCar($input: BookCarInput!) {
    bookCar(input: $input) {
      success
      message
      bookedCar {
        id
        startDate
        endDate
        insuranceType
        currentPaid
        previousTotalPayment
        totalPayment
        newBooking
        booker {
          id
          firstName
        }
        car {
          id
          model
          brand {
            name
          }
        }
      }
    }
  }
`;

const UPDATE_BOOKING = gql`
  mutation UpdateBookedCar($input: UpdateBookedCarInput!) {
    updateBookedCar(input: $input) {
      success
      message
      bookedCar {
        id
        booker {
          firstName
          lastName
        }
        startDate
        endDate
        newBooking
        totalPayment
        previousTotalPayment
        insuranceType
        firstBookingId
        currentPaid
        bookingChanges {
          cancelled
          moneyReturned
          rentId {
            id
          }
          newBookingId {
            id
          }
        }
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

const RENT_CAR = gql`
  mutation Rent($input: CreateRentInput!) {
    createRent(input: $input) {
      success
      message
      rent {
        id
        car {
          id
        }
        renter {
          id
          firstName
          lastName
        }
        pickupDate
        rated
        rentPrice
        deposit
        additionalCosts
        depositCollected
        allFinancialSorted
        depositReturned
      }
    }
  }
`;

const UPDATE_RENT = gql`
  mutation UpdateRent($input: UpdateRentInput!) {
    updateRent(input: $input) {
      message
      success
      rent {
        id
        returnDate
        additionalCosts
        handlingOverCard {
          milageBefore
          milageAfter
          fullTankAfter
          fuelCost
          dmgBefore
          dmgBeforeDesc
          dmgAfter
          dmgAfterDesc
          regDocAfter
          ocInsAfter
          fireExtAfter
          triangleAfter
          firstAidKitAfter
          arealAfter
          spareWheelAfter
          gpsAfter
          userManualAfter
        }
      }
    }
  }
`;

const UPDATE_CAR_FROM_HANDLING_OVER_CARD = gql`
  mutation UpdateCarFromHandlingOverCard($input: UpdateCarInput!) {
    updateCar(input: $input) {
      message
      success
      car {
        milage
        damaged
        dmgDescription
        location
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
  CREATE_CAR,
  SIGN_UP,
  CREATE_COMMENT,
  UPLOAD_IMAGE,
  BOOK_CAR,
  UPDATE_BOOKING,
  RENT_CAR,
  UPDATE_RENT,
  UPDATE_CAR_FROM_HANDLING_OVER_CARD
};
