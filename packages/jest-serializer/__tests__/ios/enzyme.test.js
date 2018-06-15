import React from "react";
import { View, Text } from "react-native";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import { addSerializers, enzymeTreeSerializer } from "../../src";
import SomeComponent from "../some-component";

Enzyme.configure({ adapter: new React16Adapter() });

const Component = () => (
  <View>
    <Text>Hello World!</Text>
    <View>
      <SomeComponent />
    </View>
  </View>
);

describe("On native the Enzyme shallow serializer should", () => {
  addSerializers(expect, enzymeTreeSerializer());

  it("render the expected snapshot", () =>
    expect(shallow(<Component />)).toMatchSnapshot());
});
