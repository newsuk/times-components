const defaultMockTypes = {
    Article: {__typename: "Article"},
    Media: {__typename: "Image"},
    ArticleSlice: {
      __typename: "StandardSlice",
    },
    Slug: "a-slug",
    Markup: {__typename: "Markup"},
  }

function isObject(data) {
    return typeof data === 'object';
}

function createMockFunctions(mockData) {
    if (mockData && !Object.keys(mockData).every(key => defaultMockTypes[key])) {
      throw new Error(`Your mocks do not match the default types, provided mocks are: ${Object.keys(mockData)}`)
    }

    return Object.keys(defaultMockTypes).reduce(( newObj, key ) => {
        if (mockData && mockData[key]) {
            newObj[key] = isObject(mockData[key]) ?  
            () => ({
                __typename: defaultMockTypes[key].__typename,
                ...mockData[key]
            }) :
            () => mockData[key];
        } else {
            newObj[key] = isObject(defaultMockTypes[key]) ? 
            () => ({...defaultMockTypes[key]}) : 
            () => defaultMockTypes[key]
        }
        return newObj;
    }, {})
  }
  
export default createMockFunctions;
