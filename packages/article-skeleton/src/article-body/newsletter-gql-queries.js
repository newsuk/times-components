import gql from "graphql-tag";

export const GET_NEWSLETTER = gql`
  query GetNewsletter($id: String!) {
    newsletter(id: $id) {
      id
      isSubscribed
    }
  }
`;

export const SUBSCRIBE_NEWSLETTER = gql`
  mutation SubscribeNewsletter($id: String!) {
    subscribeNewsletter(id: $id) {
      id
      isSubscribed
    }
  }
`;
