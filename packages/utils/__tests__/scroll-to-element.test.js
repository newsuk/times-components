import { handleOnClickScrollTo, handleHrefScrollTo } from "../src/index";

describe("handleOnClickScrollTo", () => {
  it("should return undefined when no url is supplied", () => {
    expect(handleOnClickScrollTo()).toBeUndefined();
  });
});

describe("handleHrefScrollTo", () => {
  it("should return undefined when no url is supplied", () => {
    expect(handleHrefScrollTo()).toBeUndefined();
  });

  it("should return null when url starts with a hash", () => {
    expect(handleHrefScrollTo("#12345")).toBeNull();
  });
});
