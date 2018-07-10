import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
import iterator from "../src/index";

const exampleTest = ordinal => {
  const TextComponent = <Text>This is the {ordinal} test</Text>;
  const wrapper = shallow(TextComponent);
  expect(wrapper).toMatchSnapshot();
};

const exampleTests = [
  {
    name: "test example one",
    test: () => exampleTest("first")
  },
  {
    name: "text example two",
    test: () => exampleTest("second")
  },
  {
    name: "ALL TEST NAMES SHOULD BE LOWERCASE",
    test: () => exampleTest("third")
  }
];

export default () => iterator(exampleTests);
