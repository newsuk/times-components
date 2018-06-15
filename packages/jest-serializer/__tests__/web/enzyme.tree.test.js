import React from "react";
import { Text } from "react-native";
import Enzyme, { mount } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import { addSerializers, enzymeTreeSerializer } from "../../src";
import SomeComponent from "../some-component";

Enzyme.configure({ adapter: new React16Adapter() });

describe("On web the Enzyme", () => {
  describe("tree serializer should", () => {
    addSerializers(expect, enzymeTreeSerializer());

    it("render the expected snapshot", () => {
      const mounted = mount(
        <SomeComponent>
          <Text>Hello!</Text>
        </SomeComponent>
      );

      expect(mounted).toMatchSnapshot();
    });
  });
});
