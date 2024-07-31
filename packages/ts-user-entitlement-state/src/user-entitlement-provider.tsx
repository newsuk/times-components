import React, { useMemo } from 'react';
import { FetchProvider } from '@times-components/ts-components';
import { UserEntitlements } from './user-entitlements';

export const UserEntitlementProvider = ({ children }: any) => {
  const fetchOptions = useMemo(() => ({ credentials: 'same-origin' }), []);
  return (
    <FetchProvider url="api/get-user-entitlements" options={fetchOptions}>
      <UserEntitlements>{children}</UserEntitlements>
    </FetchProvider>
  );
};
