import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import "./mock-timezone-london";
import DatePublication from "../src/date-publication";

export default date => {
  const tests = [
    {
      name: "date and TIMES publication",
      test() {
        const testInstance = TestRenderer.create(
          <DatePublication date={date} publication="TIMES" />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "date and SUNDAYTIMES publication",
      test() {
        const testInstance = TestRenderer.create(
          <DatePublication date={date} publication="SUNDAYTIMES" />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "date and no given publication",
      test() {
        const testInstance = TestRenderer.create(
          <DatePublication date={date} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "date and no day",
      test() {
        const testInstance = TestRenderer.create(
          <DatePublication date={date} showDay={false} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
