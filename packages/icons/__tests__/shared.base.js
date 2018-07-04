import "react-native";
import React from "react";
import * as Icons from "../src/icons";

export default renderMethod =>
  Object.entries(Icons).forEach(([name, Icon], indx) => {
    const testName = `${name} renders`;

    it(testName, () => {
      const output = renderMethod(<Icon title={name} width={50} height={50} />);

      expect(output).toMatchSnapshot(`${indx}. ${testName}`);
    });
  });
