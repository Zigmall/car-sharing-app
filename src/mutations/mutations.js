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
        location {
          id
          point
          fullAddress
          city
        }
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
        location {
          id
          point
          fullAddress
          city
        }
      }
    }
  }
`;

const UPDATE_RENT_AFTER_COMMENT = gql`
  mutation UpdateRentAfterComment($input: UpdateRentInput!) {
    updateRent(input: $input) {
      message
      success
      rent {
        id
        rated
      }
    }
  }
`;

const UPDATE_CAR = gql`
  mutation UpdateCar($input: UpdateCarInput!) {
    updateCar(input: $input) {
      message
      success
      car {
        id
        dmgDescription
        description
        deposit
        damaged
        carClass {
          name
        }
        brand {
          name
        }
        benefits
        location {
          id
          point
          fullAddress
          city
        }
        milage
        model
        picturePath {
          url
        }
        pictures {
          url
        }
        price
        property {
          seats
          doors
          trunk
          engine
          airConditioning
          manualGearBox
        }
        year
      }
    }
  }
`;

const DELETE_CAR = gql`
  mutation DeleteCar($carId: ID!) {
    deleteCar(id: $carId) {
      message
      success
    }
  }
`;

export {
  DELETE_USER,
  UPDATE_USER,
  LOG_IN,
  UPDATE_MY_PERSONAL_DATA,
  CREATE_CAR,
  SIGN_UP,
  CREATE_COMMENT,
  UPLOAD_IMAGE,
  BOOK_CAR,
  UPDATE_BOOKING,
  RENT_CAR,
  UPDATE_RENT,
  UPDATE_CAR_FROM_HANDLING_OVER_CARD,
  UPDATE_RENT_AFTER_COMMENT,
  UPDATE_CAR,
  DELETE_CAR
};
