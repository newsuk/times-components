import React from "react";
// import { useFetch } from '@times-components/ts-components';

// interface FeatureDecision {
//   code: string;
//   name: string;
//   outcome: string;
// }

// interface Subscription {
//   id: string;
//   featureDecisions: FeatureDecision[];
// }

// interface User {
//   cpn: string;
//   subscriptions: Subscription[];
// }

// interface Data {
//   user: User;
// }

// interface FetchResponse {
//   data: Data;
// }

// export interface UserEntitlementProps {
//   loading?: boolean;
//   error?: string;
//   data: FetchResponse;
// }

export const UserEntitlements = ({ userEntitlementsList, children }) => {
  // const { data, loading } = useFetch();

  // console.log("fetchResponse", userEntitlementsList);

  // const subscriptions = data?.data?.user?.subscriptions || []
  const featureDecisions =
    (userEntitlementsList &&
      userEntitlementsList.user &&
      userEntitlementsList.user.subscriptions &&
      userEntitlementsList.user.subscriptions[0] &&
      userEntitlementsList.user.subscriptions[0].featureDecisions) ||
    [];
  // const {
  //   data: { user }
  // } = fetchResponse || {};
  // const { subscriptions } = user || [];
  // console.log('featureDecisions', featureDecisions);

  const isCommentingEntitlementEnabled =
    featureDecisions &&
    featureDecisions.some(decision => {
      return (
        decision.code === "fp-752" &&
        decision.outcome.toLowerCase().includes("disable")
      );
    });

  if (userEntitlementsList === undefined) {
    return null;
  }

  return isCommentingEntitlementEnabled && children;
};
