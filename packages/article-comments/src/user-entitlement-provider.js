import React, { useMemo } from "react";
import { FetchProvider } from "@times-components/ts-components";
import { UserEntitlements } from "./user-entitlements";

const UserEntitlementProvider = ({ children }) => {
  console.log("children inside UserEntitlementProvider", children);
  return (
    <></>
    // <FetchProvider url="/api/get-user-entitlements">
    // <UserEntitlements>{children}</UserEntitlements>
    // </FetchProvider>
  );
};

export default UserEntitlementProvider;
