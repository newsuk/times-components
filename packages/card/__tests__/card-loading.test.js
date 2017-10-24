/* eslint-env jest */

import "react-native";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import React from "react";
import CardLoading from "../card-loading";

Enzyme.configure({ adapter: new React16Adapter() });

it("renders loading card state", () => {
  const component = shallow(<CardLoading />);

  expect(component).toMatchSnapshot();
});
