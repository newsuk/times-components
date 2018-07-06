import React from "react";
import * as Icons from "../src/icons";

export default renderMethod =>
  Object.entries(Icons).forEach(([name, Icon], indx) => {
    const testName = `${name} sets a width when height is set`;

    it(testName, () => {
      const output = renderMethod(<Icon height={50} />);

      expect(output).toMatchSnapshot(`${indx + 1}. ${testName}`);
    });
  });
