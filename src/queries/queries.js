import { gql } from '@apollo/client';

const GET_ALL_USERS = gql`
  query AllUsers {
    allUsers {
      id
      firstName
      lastName
      email
      role
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
`;

const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
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
      rents {
        id
        car {
          brand {
            name
          }
          model
        }
        rated
      }
    }
  }
`;

const ALL_CARS = gql`
  query getCars {
    cars {
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
      milage
      deposit
      damaged
      dmgDescription
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
      location {
        id
        point
        fullAddress
        city
      }
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
      rents {
        id
        car {
          brand {
            name
          }
          model
        }
        rated
      }
      avatar {
        color
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
        carClass {
          name
        }
        benefits
        brand {
          name
        }
        year
        milage
        deposit
        damaged
        dmgDescription

        location {
          city
          fullAddress
          id
          point
        }
        price
        picturePath {
          url
        }
        pictures {
          url
        }
        description
      }
    }
  }
`;

const GET_CAR_CLASSES = gql`
  query CarClasses {
    carClasses {
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
      carClass {
        name
      }
      benefits
      model
      brand {
        name
      }
      year
      milage
      deposit
      damaged
      dmgDescription
      property {
        seats
        doors
        trunk
        engine
        airConditioning
        manualGearBox
      }
      picturePath {
        url
      }
      pictures {
        url
      }
      location {
        id
        point
        fullAddress
        city
      }
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

const GET_ALL_BOOKINGS = gql`
  query Bookers {
    bookedCars {
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
`;

const GET_BOOKING_BY_ID = gql`
  query BookingById($bookingId: ID!) {
    bookedCar(id: $bookingId) {
      id
      startDate
      endDate
      newBooking
      insuranceType
      firstBookingId
      currentPaid
      previousTotalPayment
      totalPayment
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
      booker {
        id
        firstName
        lastName
        email
        mobile
        role
        address {
          country
          city
          street
          houseNumber
          flatNumber
          postCode
        }
      }
      car {
        id
        brand {
          id
          name
        }
        model
        carClass {
          id
          name
        }
        picturePath {
          url
        }
        pictures {
          url
        }
        price
        year
        deposit
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

const GET_ALL_RENTS = gql`
  query Rents {
    rents {
      id
      car {
        id
        brand {
          name
        }
        model
      }
      renter {
        firstName
        lastName
      }
      booking {
        id
        startDate
        endDate
        insuranceType
        newBooking
        bookingChanges {
          newBookingId {
            id
          }
          rentId {
            id
          }
        }
      }
      pickupDate
      returnDate
      returnLocation {
        id
        point
        fullAddress
        city
      }
      rated
      rentPrice
      deposit
      additionalCosts
      depositCollected
      totalCosts
      allFinancialSorted
      depositReturned
    }
  }
`;

const GET_RENT_BY_ID = gql`
  query Rent($rentId: ID!) {
    rent(id: $rentId) {
      id
      car {
        id
        brand {
          name
        }
        damaged
        deposit
        dmgDescription
        location {
          id
          point
          fullAddress
          city
        }
        milage
        model
        price
        year
      }
      pickupDate
      returnDate
      returnLocation {
        id
        point
        fullAddress
        city
      }
      rated
      rentPrice
      deposit
      additionalCosts
      depositCollected
      totalCosts
      allFinancialSorted
      depositReturned
      booking {
        startDate
        previousTotalPayment
        totalPayment
        newBooking
        insuranceType
        firstBookingId
        endDate
        id
      }
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
`;

const BOOKED_CARS_BY_USER_ID = gql`
  query BookedCarsByUserId {
    bookedCarsByUserId {
      id
      booker {
        id
      }
      startDate
      endDate
      insuranceType
      newBooking
      firstBookingId
      bookingChanges {
        cancelled
        moneyReturned
        newBookingId {
          id
        }
        rentId {
          id
        }
      }
      currentPaid
      previousTotalPayment
      totalPayment
      car {
        id
        brand {
          name
        }
        model
        picturePath {
          url
        }
        price
      }
    }
  }
`;

const GET_LOCATIONS = gql`
  query Locations {
    locations {
      id
      point
      fullAddress
      city
    }
  }
`;

export {
  GET_ALL_USERS,
  GET_USER,
  ALL_CARS,
  GET_CURRENT_USER,
  GET_BRANDS,
  GET_CAR,
  GET_CAR_CLASSES,
  GET_ALL_BOOKINGS,
  GET_BOOKING_BY_ID,
  GET_ALL_RENTS,
  GET_RENT_BY_ID,
  BOOKED_CARS_BY_USER_ID,
  GET_LOCATIONS
};
