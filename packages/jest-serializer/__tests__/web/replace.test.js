import React from "react";
import { AppRegistry } from "react-native-web";
import Enzyme, { mount } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16/build/index";
import { View, Text } from "react-native";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  justChildren,
  meltNative,
  propsNoChildren,
  replace,
  replaceTransform,
  stylePrinter,
  rnwTransform
} from "../../src";

Enzyme.configure({ adapter: new React16Adapter() });

describe("The replace serializer should", () => {
  it("replace the expected component", () => {
    addSerializers(
      expect,
      enzymeTreeSerializer(),
      replace({
        ChildComponent: () => ({
          node: { type: "Placeholder" },
          props: {},
          children: [<Text>Replaced</Text>]
        })
      })
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <View>{children}</View>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <Text>{text}</Text>;

    const wrapper = mount(
      <WrapperComponent>
        <ChildComponent text="Hello world!" />
      </WrapperComponent>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("replace the expected component completely", () => {
    addSerializers(
      expect,
      enzymeTreeSerializer(),
      replace({
        ChildComponent: null
      })
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <View>{children}</View>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <Text>{text}</Text>;

    const wrapper = mount(
      <WrapperComponent>
        <ChildComponent text="Hello world!" />
      </WrapperComponent>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("provide a helper to return the component with props and no children", () => {
    addSerializers(
      expect,
      enzymeTreeSerializer(),
      compose(
        stylePrinter,
        replaceTransform({
          ChildComponent: propsNoChildren
        }),
        rnwTransform(AppRegistry)
      )
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <View>{children}</View>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <Text>{text}</Text>;

    const wrapper = mount(
      <WrapperComponent>
        <ChildComponent text="Hello world!" />
      </WrapperComponent>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("provide a helper to return the child of an element only", () => {
    addSerializers(
      expect,
      enzymeTreeSerializer(),
      compose(
        stylePrinter,
        replaceTransform({
          ChildComponent: justChildren
        }),
        rnwTransform(AppRegistry)
      )
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <View>{children}</View>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <Text>{text}</Text>;

    const wrapper = mount(
      <WrapperComponent>
        <ChildComponent text="Hello world!" />
      </WrapperComponent>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("provide a helper to return the children of an element only", () => {
    addSerializers(
      expect,
      enzymeTreeSerializer(),
      compose(
        stylePrinter,
        replaceTransform({
          div: justChildren,
          View: justChildren,
          WrapperComponent: justChildren
        }),
        rnwTransform(AppRegistry)
      )
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <View>{children}</View>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <Text>{text}</Text>;

    const wrapper = mount(
      <WrapperComponent>
        <ChildComponent text="Hello world1!" />
        <ChildComponent text="Hello world2!" />
        <ChildComponent text="Hello world3!" />
      </WrapperComponent>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("provide a helper to remove native elements from a web tree", () => {
    addSerializers(
      expect,
      enzymeTreeSerializer(),
      compose(
        stylePrinter,
        replaceTransform({
          ...meltNative
        }),
        rnwTransform(AppRegistry)
      )
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <View>{children}</View>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <Text>{text}</Text>;

    const wrapper = mount(
      <WrapperComponent>
        <ChildComponent text="Hello world!" />
      </WrapperComponent>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
