import React from 'react';
import { useFetch } from '@times-components/ts-components';

interface FeatureDecision {
  code: string;
  name: string;
  outcome: string;
}

interface Subscription {
  id: string;
  featureDecisions: FeatureDecision[];
}

interface User {
  cpn: string;
  subscriptions: Subscription[];
}

interface Data {
  user: User;
}

interface FetchResponse {
  data: Data;
}

export interface UserEntitlementProps {
  loading?: boolean;
  error?: string;
  data: FetchResponse;
}

export const UserEntitlements: React.FC = React.memo(({ children }) => {
  const { data: fetchResponse } = useFetch<FetchResponse>();
  const {
    data: { user }
  } = (fetchResponse as FetchResponse) || {};
  const { subscriptions } = user || [];
  console.log('fetchResponse', fetchResponse);

  const isCommentingEntitlementEnabled = subscriptions.some(subscription => {
    return subscription.featureDecisions.some(decision =>
      decision.outcome.toLowerCase().includes('enable')
    );
  });

  console.log('subscriptions', subscriptions);

  return <>{isCommentingEntitlementEnabled ? children : null}</>;
});
