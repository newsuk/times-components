import React from "react";
import TestRenderer from "react-test-renderer";
import { View, Text } from "react-native";
import {
  addSerializers,
  justChildren,
  propsNoChildren,
  replace
} from "../../src";

describe("The replace serializer should", () => {
  it("replace the expected component", () => {
    addSerializers(
      expect,
      replace({
        Text: () => ({
          children: [<Text>Replaced</Text>],
          node: { type: "Placeholder" },
          props: {}
        })
      })
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <View>{children}</View>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <Text>{text}</Text>;

    const testInstance = TestRenderer.create(
      <WrapperComponent>
        <ChildComponent text="Hello world!" />
      </WrapperComponent>
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });

  it("replace the expected component completely", () => {
    addSerializers(
      expect,
      replace({
        Text: null
      })
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <View>{children}</View>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <Text>{text}</Text>;

    const testInstance = TestRenderer.create(
      <WrapperComponent>
        <ChildComponent text="Hello world!" />
      </WrapperComponent>
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });

  it("provide a helper to return the component with props and no children", () => {
    addSerializers(
      expect,
      replace({
        Text: propsNoChildren
      })
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <View>{children}</View>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <Text>{text}</Text>;

    const testInstance = TestRenderer.create(
      <WrapperComponent>
        <ChildComponent text="Hello world!" />
      </WrapperComponent>
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });

  it("provide a helper to return the child of an element only", () => {
    addSerializers(
      expect,
      replace({
        Text: justChildren
      })
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <View>{children}</View>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <Text>{text}</Text>;

    const testInstance = TestRenderer.create(
      <WrapperComponent>
        <ChildComponent text="Hello world!" />
      </WrapperComponent>
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });

  it("provide a helper to return the children of an element only", () => {
    addSerializers(
      expect,
      replace({
        View: justChildren
      })
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <View>{children}</View>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <Text>{text}</Text>;

    const testInstance = TestRenderer.create(
      <WrapperComponent>
        <ChildComponent text="Hello world1!" />
        <ChildComponent text="Hello world2!" />
        <ChildComponent text="Hello world3!" />
      </WrapperComponent>
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
});
