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
  // const data = {
  //   data: {
  //     user: {
  //       "cpn": "3BOK090867019",
  //       subscriptions: [
  //         {
  //           "id": "SUB-0011075014",
  //           "featureDecisions": [
  //             {
  //               "code": "fp-752",
  //               "name": "Full Commenting Read/Write Access",
  //               "outcome": "Disable_Commenting"
  //             },
  //             {
  //               "code": "fp-753",
  //               "name": "Full Sharing Access",
  //               "outcome": "Disable_Sharing"
  //             },
  //             {
  //               "code": "fp-754",
  //               "name": "Full Article Saving Access",
  //               "outcome": "Disable_Article_Saving"
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   }
  // }
  // console.log('fetchResponse', data);

  // const subscriptions: any = []

  // const subscriptions = data?.data?.user?.subscriptions || []
  // const {
  //   data: { user }
  // } = (fetchResponse as FetchResponse) || {};
  // const { subscriptions } = user || [];
  // console.log('subscriptions', subscriptions);

  console.log('fetchResponse', fetchResponse);

  // const isCommentingEntitlementEnabled = subscriptions.some(subscription => {
  //   return subscription.featureDecisions.some(decision =>
  //     decision.code ==="fp-752" && decision.outcome.toLowerCase().includes('enable')
  //   );
  // });

  // console.log('subscriptions', subscriptions);

  return <>{true ? children : null}</>;
});
