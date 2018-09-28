import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import "./mock-timezone-non-london";
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
    }
  ];

  iterator(tests);
};
