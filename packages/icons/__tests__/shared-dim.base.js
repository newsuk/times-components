import React from "react";
import { iterator } from "@times-components/test-utils";
import * as Icons from "../src/icons";

export default renderMethod => {
  const tests = [];

  Object.entries(Icons).forEach(([name, Icon]) => {
    tests.push({
      name: `${name} sets a width when height is set`,
      test() {
        const output = renderMethod(<Icon height={50} />);

        expect(output).toMatchSnapshot();
      }
    });
  });

  iterator(tests);
};
