import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import DatePublication from "../src/date-publication";

export default (date, { londonTimezone, nonLondonTimezone }) => {
  const tests = [
    {
      name: "date and TIMES publication",
      test() {
        londonTimezone();
        const testInstance = TestRenderer.create(
          <DatePublication date={date} publication="TIMES" />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "date and SUNDAYTIMES publication",
      test() {
        londonTimezone();
        const testInstance = TestRenderer.create(
          <DatePublication date={date} publication="SUNDAYTIMES" />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "date and no given publication",
      test() {
        londonTimezone();
        const testInstance = TestRenderer.create(
          <DatePublication date={date} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "date and no day",
      test() {
        londonTimezone();
        const testInstance = TestRenderer.create(
          <DatePublication date={date} showDay={false} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "date and TIMES publication with non-London timezone",
      test() {
        nonLondonTimezone();
        const testInstance = TestRenderer.create(
          <DatePublication date={date} publication="TIMES" />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
