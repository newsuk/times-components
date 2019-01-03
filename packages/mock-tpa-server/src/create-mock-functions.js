/* eslint-disable no-param-reassign, no-underscore-dangle */

import defaultMockTypes from "./default-mock-types";

function isObject(data) {
  return typeof data === "object";
}

function createMockFunctions(mockData) {
  if (mockData) {
    const missingMocks = [];

    Object.keys(mockData).forEach(key => {
      if (!defaultMockTypes[key]) {
        missingMocks.push(key);
      }
    });

    if (missingMocks.length !== 0)
      throw new Error(
        `Your provided mocks do not match the default types of ${Object.keys(
          defaultMockTypes
        )}, \n offending provided mocks are ${missingMocks}`
      );
  }

  return Object.keys(defaultMockTypes).reduce((newObj, key) => {
    if (mockData && mockData[key]) {
      newObj[key] = isObject(mockData[key])
        ? () => ({
            __typename: defaultMockTypes[key].__typename,
            ...mockData[key]
          })
        : () => mockData[key];
    } else {
      newObj[key] = isObject(defaultMockTypes[key])
        ? () => ({ ...defaultMockTypes[key] })
        : () => defaultMockTypes[key];
    }
    return newObj;
  }, {});
}

export default createMockFunctions;
