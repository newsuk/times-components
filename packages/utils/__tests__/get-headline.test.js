import { getHeadline } from "../src/index.web";

const headline = "A really long headline";
const shortHeadline = "Short Headline";

describe("getHeadline", () => {
  it("should give the headline over the short headline if provided", () => {
    expect(getHeadline(headline, shortHeadline)).toEqual(headline);
  });

  it("should give the short headline if not headline is provided", () => {
    expect(getHeadline(null, shortHeadline)).toEqual(shortHeadline);
  });

  it("should give the headline over the short headline if the short headline is not provided", () => {
    expect(getHeadline(headline, null)).toEqual(headline);
  });
});
