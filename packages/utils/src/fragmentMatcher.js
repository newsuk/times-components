/* eslint-disable no-underscore-dangle */

import { IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import introspectionResult from "./schema.json";

const filteredTypes = introspectionResult.data.__schema.types.filter(
  ({ possibleTypes }) => possibleTypes !== null
);
const introspectionQueryResultData = {
  __schema: {
    ...introspectionResult.data.__schema,
    types: filteredTypes
  }
};

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

export default fragmentMatcher;
