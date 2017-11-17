/* eslint-env jest */

import "react-native";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import React from "react";
import Placeholder from "../placeholder";

Enzyme.configure({ adapter: new React16Adapter() });

export default () => {
  it("renders loading image when width set", () => {
    const wrapper = shallow(<Placeholder />);
    wrapper.setState({
      width: 300
    });

    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders component and handles layout width", done => {
    const comp = new Placeholder();

    comp.setState = ({ width }) => {
      expect(width).toEqual(320);

      return done();
    };

    comp.handleLayout({ nativeEvent: { layout: { width: 320 } } });
  });
};
