import React from "react";
import { Text } from "react-native";
import { iterator } from "@times-components/test-utils";
import Gradient from "../src/gradient";

export default renderMethod => {
  const tests = [
    {
      name: "gradient",
      test: () => {
        const output = renderMethod(<Gradient />);

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "gradient with a child",
      test: () => {
        const output = renderMethod(
          <Gradient>
            <Text>Hello world!</Text>
          </Gradient>
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
