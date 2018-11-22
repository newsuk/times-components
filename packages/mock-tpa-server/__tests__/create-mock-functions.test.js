

describe("create mock functions", () => {
    it("should return an object", () => {
        expect(typeof createMockFunctions()).toBe('object')
    })

    it("should return an object with values that are functions", () => {
        const mocks = createMockFunctions()
      
        Object.values(mocks).forEach(value => {
            expect(typeof value).toBe('function')
        })
    })

    it("should combine defaults with the overriding mocks", () => {
        const mockData = {
            Article: {
                hasVideo: false,
                commentsEnabled: false,
            }
        };

        const { Article } = createMockFunctions(mockData);
        expect(Article()).toEqual({__typename: "Article", ...mockData.Article});
    }),

   it("should throw an exception if the default type does not exist", () => {
       const mockData = {
           lol: "i dont exist"
       }

       expect(() => createMockFunctions(mockData)).toThrowError()
   })

   it("should not append __typename to primitive objects default types", () => {
        const {Slug} = createMockFunctions();
        expect(typeof Slug()).toBe('string')
   })

   it("should not append __typename to primitive objects types if mock is provided", () => {
    const mockData = {
        Slug: 'i-am-slug'
    };
    const {Slug} = createMockFunctions(mockData);
    expect(Slug()).toBe(mockData.Slug)
    })
})

function isObject(data) {
    return typeof data === 'object';
}

function createMockFunctions(mockData) {
    const defaultMockTypes = {
      Article: {__typename: "Article"},
      Media: {__typename: "Image"},
      ArticleSlice: {
        __typename: "StandardSlice",
      },
      Slug: "some-slug",
      Markup: {__typename: "Markup"},
    }

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
  
