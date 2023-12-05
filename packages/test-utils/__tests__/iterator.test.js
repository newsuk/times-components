import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { iterator } from "../src/index";

Enzyme.configure({ adapter: new Adapter() });

const exampleTest = ordinal => {
  const TextComponent = <div>This is the {ordinal} test</div>;
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

iterator(exampleTests);
