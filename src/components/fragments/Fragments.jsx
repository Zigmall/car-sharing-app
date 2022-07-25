import { gql } from '@apollo/client';

export const AVATAR_FRAGMENT = gql`
  fragment avatarFields on Avatar {
    image {
      url
    }
    color
  }
`;

export const USER_FRAGMENT = gql`
  fragment userFields on User {
    id
    firstName
    lastName
    email
    mobile
    address {
      city
      street
      houseNo
      flatNo
      postCode
    }
    avatar {
      ...avatarFields
    }
  }
  ${AVATAR_FRAGMENT}
`;

export const CAR_COPY_FRAGMENT = gql`
  fragment carCopyFields on CarCopy {
    id
    car {
      id
    }
    borrower {
      id
      firstName
      lastName
    }
  }
  ${AVATAR_FRAGMENT}
`;
