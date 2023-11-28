import { iterator } from "@times-components/test-utils";
import hasBylineData from "../src/has-byline-data";

export default () => {
  const tests = [
    {
      name: "returns false if bylines is null",
      test: () => {
        const bylines = null;

        expect(hasBylineData(bylines)).toBeFalsy();
      }
    },
    {
      name: "returns false if bylines array is empty",
      test: () => {
        const bylines = [];

        expect(hasBylineData(bylines)).toBeFalsy();
      }
    },
    {
      name: "returns false if first byline is null",
      test: () => {
        const bylines = [
          {
            byline: null
          }
        ];

        expect(hasBylineData(bylines)).toBeFalsy();
      }
    },
    {
      name: "returns false if first byline array is empty",
      test: () => {
        const bylines = [
          {
            byline: []
          }
        ];

        expect(hasBylineData(bylines)).toBeFalsy();
      }
    },
    {
      name: "returns true if first byline is populated",
      test: () => {
        const bylines = [
          {
            byline: [
              {
                foo: "bar"
              }
            ]
          }
        ];

        expect(hasBylineData(bylines));
      }
    }
  ];

  iterator(tests);
};
