import React from "react";
import * as Icons from "../src/icons";

export default renderMethod =>
  Object.entries(Icons).forEach(([name, Icon], indx) => {
    const testName = `${name} renders with different colours`;

    it(testName, () => {
      const stroke = "#c0ffee";
      const fill = "#facade";

      const wrapper = renderMethod(
        <Icon fillColour={fill} height={50} strokeColour={stroke} />
      );

      expect(wrapper).toMatchSnapshot(`${indx + 1}. ${testName}`);
    });
  });
