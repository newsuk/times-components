/* globals it describe expect */

import createMockFunctions from "../src/create-mock-functions";

describe("create mock functions", () => {
  it("should return an object", () => {
    expect(typeof createMockFunctions()).toBe("object");
  });

  it("should return an object with values that are functions", () => {
    const mocks = createMockFunctions();

    Object.values(mocks).forEach(value => {
      expect(typeof value).toBe("function");
    });
  });

  it("should combine defaults with the overriding mocks", () => {
    const mockData = {
      Article: {
        commentsEnabled: false,
        hasVideo: false
      }
    };

    const { Article } = createMockFunctions(mockData);
    expect(Article()).toEqual({ __typename: "Article", ...mockData.Article });
  });

  it("should throw an exception if the default type does not exist", () => {
    const mockData = {
      lol: "i dont exist"
    };

    expect(() => createMockFunctions(mockData)).toThrowError();
  });

  it("should not append __typename to primitive objects default types", () => {
    const { Slug } = createMockFunctions();
    expect(typeof Slug()).toBe("string");
  });

  it("should append __typename to object default types", () => {
    const { Article } = createMockFunctions();
    expect(Article()).toEqual({ __typename: "Article" });
  });

  it("should not append __typename to primitive objects types if mock is provided", () => {
    const mockData = {
      Slug: "i-am-slug"
    };
    const { Slug } = createMockFunctions(mockData);
    expect(Slug()).toBe(mockData.Slug);
  });
});
