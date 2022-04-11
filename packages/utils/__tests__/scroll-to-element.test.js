import { handleOnClickScrollTo, handleHrefScrollTo } from "../src/index";

const scrollTo = jest.fn();

global.window = { pageYOffset: 150, scrollTo };
global.document = {
  getElementById: () => ({ getBoundingClientRect: () => ({ top: 100 }) }),
  querySelector: () => ({ offsetHeight: 0 })
};

const event = { preventDefault: () => {} };

const id = "12345";
const hash = `#${id}`;
const link = "https://www.thetimes.co.uk";

describe("handleOnClickScrollTo", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should not call scrollTo - when no url is supplied", () => {
    handleOnClickScrollTo(event);
    expect(scrollTo).toHaveBeenCalledTimes(0);
  });

  it("should not call scrollTo - when url does not starts with a hash", () => {
    handleOnClickScrollTo(event);
    expect(scrollTo).toHaveBeenCalledTimes(0);
  });

  describe("small breakpoint", () => {
    it("should call scrollTo - with correct values - for small breakpoint", () => {
      window.innerWidth = 370;
      handleOnClickScrollTo(event, hash);
      expect(scrollTo).toHaveBeenCalledWith({ top: 140, behavior: "smooth" });
    });
  });

  describe("medium breakpoint", () => {
    it("should call scrollTo - with correct values - for medium breakpoint", () => {
      window.innerWidth = 1024;
      handleOnClickScrollTo(event, hash);
      expect(scrollTo).toHaveBeenCalledWith({ top: 150, behavior: "smooth" });
    });

    it("should call scrollTo - with correct values - for medium breakpoint with section bar", () => {
      window.innerWidth = 1024;
      document.querySelector = () => ({ offsetHeight: 20 });
      handleOnClickScrollTo(event, hash);
      expect(scrollTo).toHaveBeenCalledWith({ top: 130, behavior: "smooth" });
    });
  });

  describe("large breakpoint", () => {
    it("should call scrollTo - with correct values - for large breakpoint", () => {
      window.innerWidth = 1420;
      handleOnClickScrollTo(event, hash);
      expect(scrollTo).toHaveBeenCalledWith({ top: 180, behavior: "smooth" });
    });

    it("should call scrollTo - with correct values - for large breakpoint with section bar", () => {
      window.innerWidth = 1420;
      document.querySelector = () => ({ offsetHeight: 40 });
      handleOnClickScrollTo(event, hash);
      expect(scrollTo).toHaveBeenCalledWith({ top: 160, behavior: "smooth" });
    });
  });
});

describe("handleHrefScrollTo", () => {
  it("should return undefined - when no url is supplied", () => {
    expect(handleHrefScrollTo()).toBeUndefined();
  });

  it("should return null - when url starts with a hash", () => {
    expect(handleHrefScrollTo(hash)).toBeNull();
  });

  it("should return the url - when url does not starts with a hash", () => {
    expect(handleHrefScrollTo(link)).toEqual(link);
  });
});
