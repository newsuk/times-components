import React, { useEffect, useState } from 'react';
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
  // const { data, loading } = useFetch();
  const [userEntitlements, setUserEntitlements] = useState(undefined);
  useEffect(() => {
    const fetchUserEntitlements = async () => {
      const response = await fetch('/api/get-user-entitlements');
      const data = await response.json();
      setUserEntitlements(data);
    }
    fetchUserEntitlements();
  }, []);

  console.log("fetchResponse", userEntitlements);

  // const subscriptions = data?.data?.user?.subscriptions || []
  const featureDecisions = userEntitlements && userEntitlements.fetchResponse && userEntitlements.user && userEntitlements.user.subscriptions && userEntitlements.user.subscriptions[0] && userEntitlements.user.subscriptions[0].featureDecisions || [];
  // const {
  //   data: { user }
  // } = fetchResponse || {};
  // const { subscriptions } = user || [];
  console.log('featureDecisions', featureDecisions);

  const isCommentingEntitlementEnabled = featureDecisions && featureDecisions.some(decision =>
      decision.code ==="fp-752" && decision.outcome.toLowerCase().includes('enable')
    );

    if(userEntitlements === undefined) {
      return null;
    }

  return <>{isCommentingEntitlementEnabled ? children : null}</>;
});
