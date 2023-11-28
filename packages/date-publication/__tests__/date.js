/* global Intl */
import { iterator } from "@times-components/test-utils";
import "./mock-timezone-london";
import { isBST, getUTCTime, isLondonTimezone } from "../src/date";

export default () => {
  const realIntl = Intl;

  const tests = [
    {
      name: "2017-11-17 00:01:00 should be a GMT date",
      test() {
        expect(isBST(getUTCTime("2017-11-17T00:01:00.000Z"))).toEqual(false);
      }
    },
    {
      name: "2017-05-17 00:01:00 should be a BST date",
      test() {
        expect(isBST(getUTCTime("2017-05-17T00:01:00.000Z"))).toEqual(true);
      }
    },
    {
      name: "should return true when London is the timezone",
      test() {
        expect(isLondonTimezone()).toEqual(true);
      }
    }
  ];

  iterator(tests);
  global.Intl = realIntl;
};
