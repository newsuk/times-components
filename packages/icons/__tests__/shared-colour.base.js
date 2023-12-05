import React from "react";
import { iterator } from "@times-components/test-utils";
import * as Icons from "../src/icons";

export default renderMethod => {
  const tests = [];

  Object.entries(Icons).forEach(([name, Icon]) => {
    tests.push({
      name: `${name} renders with different colours`,
      test() {
        const stroke = "#c0ffee";
        const fill = "#facade";

        const output = renderMethod(
          <Icon fillColour={fill} height={50} strokeColour={stroke} />
        );

        expect(output).toMatchSnapshot();
      }
    });
  });

  iterator(tests);
};
