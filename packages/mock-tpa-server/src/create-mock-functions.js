/* eslint-disable no-param-reassign, no-underscore-dangle */

const defaultMockTypes = {
  Article: { __typename: "Article" },
  ArticleSlice: {
    __typename: "StandardSlice"
  },
  Markup: { __typename: "Markup" },
  Media: { __typename: "Image" },
  Slug: "a-slug"
};

function isObject(data) {
  return typeof data === "object";
}

function createMockFunctions(mockData) {

  console.log(mockData)
  // if (mockData && !Object.keys(mockData).every(key => defaultMockTypes[key])) {
  //   throw new Error(
  //     `Your mocks do not match the default types, provided mocks are: ${Object.keys(
  //       mockData
  //     )}`
  //   );
  // }

  if (mockData) {
    const missingMocks = [];

    for (let key in mockData) {
      if(!defaultMockTypes[key]) {
        missingMocks.push(key)
      }
    }

    if (missingMocks.length !== 0) throw new Error(`Your mocks do not match the default types, offending mocks are ${missingMocks}`)
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
