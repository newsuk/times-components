import React from 'react';
import { useFetch } from '@times-components/ts-components';

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

export const UserEntitlements = React.memo(({ children }) => {
  const { data: fetchResponse } = useFetch();
  console.log("fetchResponse", fetchResponse);

  // const subscriptions = data?.data?.user?.subscriptions || []
  const featureDecisions = fetchResponse && fetchResponse.user && fetchResponse.user.subscriptions && fetchResponse.user.subscriptions[0] && fetchResponse.user.subscriptions[0].featureDecisions || [];
  // const {
  //   data: { user }
  // } = fetchResponse || {};
  // const { subscriptions } = user || [];
  console.log('featureDecisions', featureDecisions);

  const isCommentingEntitlementEnabled = featureDecisions.some(decision =>
      decision.code ==="fp-752" && decision.outcome.toLowerCase().includes('enable')
    );

  return <>{isCommentingEntitlementEnabled ? children : null}</>;
});
