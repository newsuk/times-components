import React from "react";
import { iterator } from "@times-components/test-utils";
import Button from "../src/button";

export default renderMethod => {
  const tests = [
    {
      name: "button",
      test: () => {
        const output = renderMethod(
          <Button onPress={() => null} title="test button" />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
