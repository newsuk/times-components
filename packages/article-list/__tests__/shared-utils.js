import { iterator } from "@times-components/test-utils";

const headline = "I am a long headline used in Articles";
const shortHeadline = "Short Headline";

export default ({ getHeadline }) => {
  const tests = [
    {
      name:
        "getHeadline returns a shortHeadline before a headline if its provided",
      test: () => {
        const headlineToUse = getHeadline(headline, shortHeadline);
        expect(headlineToUse).toEqual(shortHeadline);
      }
    },
    {
      name: "getHeadline returns a headline if shortHeadline is unavailable",
      test: () => {
        const headlineToUse = getHeadline(headline, null);
        expect(headlineToUse).toEqual(headline);
      }
    }
  ];

  iterator(tests);
};
