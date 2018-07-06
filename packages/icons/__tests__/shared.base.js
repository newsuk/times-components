import React from "react";
import * as Icons from "../src/icons";

export default renderMethod =>
  Object.entries(Icons).forEach(([name, Icon], indx) => {
    const testName = `${name} renders`;

    it(testName, () => {
      const output = renderMethod(<Icon title={name} width={20} />);

      expect(output).toMatchSnapshot(`${indx + 1}. ${testName}`);
    });
  });
