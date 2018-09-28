/* global Intl */
import { iterator } from "@times-components/test-utils";
import { isLondonTimezone } from "../src/date";
import "./mock-timezone-non-london";

export default () => {
  const realIntl = Intl;
  const tests = [
    {
      name: "should return false when London is NOT the timezone",
      test() {
        expect(isLondonTimezone()).toEqual(false);
      }
    }
  ];

  iterator(tests);
  global.Intl = realIntl;
};
