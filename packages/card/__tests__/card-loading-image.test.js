/* eslint-env jest */

import "react-native";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import React from "react";
import CardLoadingImage from "../card-loading-image";

Enzyme.configure({ adapter: new React16Adapter() });

it("renders loading image when width set", () => {
  const wrapper = shallow(<CardLoadingImage />);
  wrapper.setState({
    width: 300
  });

  wrapper.update();
  expect(wrapper).toMatchSnapshot();
});

it("renders component and handles layout width", done => {
  const comp = new CardLoadingImage();

  comp.setState = ({ width }) => {
    expect(width).toEqual(320);

    return done();
  };

  comp.handleLayout({ nativeEvent: { layout: { width: 320 } } });
});
