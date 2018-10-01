import React from "react";
import { Text } from "react-native";
import { iterator } from "@times-components/test-utils";
import Gradient, { OverlayGradient } from "../src/gradient";

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
    },
    {
      name: "overlay gradient",
      test: () => {
        const output = renderMethod(<OverlayGradient />);

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "overlay gradient with a child",
      test: () => {
        const output = renderMethod(
          <OverlayGradient>
            <Text>Hello world!</Text>
          </OverlayGradient>
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
