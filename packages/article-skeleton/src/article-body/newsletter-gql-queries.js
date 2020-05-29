import gql from "graphql-tag";

export const GET_NEWSLETTER = gql`
  query GetNewsletter($code: String!) {
    newsletter(code: $code) {
      id
      isSubscribed
    }
  }
`;

export const SUBSCRIBE_NEWSLETTER = gql`
  mutation SubscribeNewsletter($code: String!) {
    subscribeNewsletter(code: $code) {
      id
      isSubscribed
    }
  }
`;
