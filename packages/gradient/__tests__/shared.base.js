import React from "react";
import { Text } from "react-native";
import { iterator } from "@times-components/test-utils";
import Gradient, { OverlayGradient } from "../src/gradient";

const renderExampleText = () => <Text>Some example text</Text>;

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
        const output = renderMethod(<Gradient>{renderExampleText()}</Gradient>);

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
          <OverlayGradient>{renderExampleText()}</OverlayGradient>
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
