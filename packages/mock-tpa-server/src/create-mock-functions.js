/* eslint-disable no-param-reassign, no-underscore-dangle */

const defaultMockTypes = {
  Article: { __typename: "Article" },
  ArticleSlice: {
    __typename: "StandardSlice"
  },
  Author: {
    __typename: "Author"
  },
  DateTime: "2019-01-02",
  Markup: { __typename: "Markup" },
  Media: { __typename: "Image" },
  Slug: "a-slug",
  URL: "url",
  UUID: "uuid"
};

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
