import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
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
      name:
        "when receiving a width and height from native, the state is correctly set",
      test: () => {
        const component = shallow(
          <GradientBase endColour="#FFFFFF" startColour="#000000" />
        );
        component.instance().onLayout(
          makeMessageEvent({
            height: 100,
            width: 100
          })
        );
        expect(component.state().width).toEqual(100);
        expect(component.state().height).toEqual(100);
      }
    }
  ];

  iterator(tests);
};
