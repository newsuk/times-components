import React, { useMemo } from 'react';
import { FetchProvider } from '@times-components/ts-components';
import { UserEntitlements } from './user-entitlements';

const UserEntitlementProvider = ({ children }) => {
  const fetchOptions = useMemo(() => ({ credentials: 'same-origin' }), []);
  console.log('children inside UserEntitlementProvider', children);
  return (
    <FetchProvider url="/api/get-user-entitlements" options={fetchOptions}>
      <UserEntitlements>{children}</UserEntitlements>
    </FetchProvider>
  );
};

export default UserEntitlementProvider;