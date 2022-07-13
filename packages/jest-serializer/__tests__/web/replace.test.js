import React from "react";
import Enzyme, { mount } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16/build/index";
import { TcText, TcView } from "@times-components/utils";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  justChildren,
  meltNative,
  propsNoChildren,
  replace,
  replaceTransform,
  stylePrinter
} from "../../src";

Enzyme.configure({ adapter: new React16Adapter() });

describe("The replace serializer should", () => {
  it("replace the expected component", () => {
    addSerializers(
      expect,
      enzymeTreeSerializer(),
      replace({
        ChildComponent: () => ({
          children: [<TcText>Replaced</TcText>],
          node: { type: "Placeholder" },
          props: {}
        })
      })
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <TcView>{children}</TcView>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <TcText>{text}</TcText>;

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
    const WrapperComponent = ({ children }) => <TcView>{children}</TcView>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <TcText>{text}</TcText>;

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
        })
      )
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <TcView>{children}</TcView>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <TcText>{text}</TcText>;

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
        })
      )
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <TcView>{children}</TcView>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <TcText>{text}</TcText>;

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
        })
      )
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <TcView>{children}</TcView>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <TcText>{text}</TcText>;

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
        })
      )
    );

    // eslint-disable-next-line react/prop-types
    const WrapperComponent = ({ children }) => <TcView>{children}</TcView>;
    // eslint-disable-next-line react/prop-types
    const ChildComponent = ({ text }) => <TcText>{text}</TcText>;

    const wrapper = mount(
      <WrapperComponent>
        <ChildComponent text="Hello world!" />
      </WrapperComponent>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
