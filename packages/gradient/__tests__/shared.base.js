import React from "react";
import { ART, Text } from "react-native";
import { iterator } from "@times-components/test-utils";
import Gradient, { OverlayGradient } from "../src/gradient";
import GradientBase from "../src/gradient.base";

const renderExampleText = () => <Text>Some example text</Text>;

export default renderMethod => {
  const makeMessageEvent = ({ width, height }) => ({
    nativeEvent: {
      layout: {
        height,
        width
      }
    }
  });

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
    },
    {
      name: "gradient defaults to size of its container",
      test: () => {
        const testRenderer = renderMethod(
          <GradientBase endColour="#FFFFFF" startColour="#000000" />
        );
        const testInstance = testRenderer.root;
        const view = testInstance.find(child => !!child.props.onLayout);

        view.props.onLayout(
          makeMessageEvent({
            height: 100,
            width: 100
          })
        );
        const surface = testInstance.findByType(ART.Surface);

        expect(surface.props).toEqual(
          expect.objectContaining({ height: 100, width: 100 })
        );
      }
    },
    {
      name: "can override gradient size with custom width and height",
      test: () => {
        const testRenderer = renderMethod(
          <GradientBase
            endColour="#FFFFFF"
            height={200}
            startColour="#000000"
            width={300}
          />
        );
        const testInstance = testRenderer.root;
        const surface = testInstance.findByType(ART.Surface);

        expect(surface.props).toEqual(
          expect.objectContaining({ height: 200, width: 300 })
        );
      }
    }
  ];

  iterator(tests);
};
