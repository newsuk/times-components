import React from "react";
import QueryProvider from "./query-provider";

const connectGraphql = (query, propsToVariables) => props => (
  <QueryProvider {...props} propsToVariables={propsToVariables} query={query} />
);

export default connectGraphql;
