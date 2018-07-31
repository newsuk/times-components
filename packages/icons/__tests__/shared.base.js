import React from "react";
import { iterator } from "@times-components/test-utils";
import * as Icons from "../src/icons";

export default renderMethod => {
  const tests = [];

  Object.entries(Icons).forEach(([name, Icon]) => {
    tests.push({
      name: `${name} renders`,
      test() {
        const output = renderMethod(<Icon title={name} width={20} />);

        expect(output).toMatchSnapshot();
      }
    });
  });

  iterator(tests);
};
