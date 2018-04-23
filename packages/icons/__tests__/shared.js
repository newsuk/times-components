/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { render, shallow } from "enzyme";
import * as Icons from "../src/icons";

function iconRenderTest(name, Icon) {
  return () => {
    const tree = renderer
      .create(<Icon title={name} width={50} height={50} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  };
}

function iconColourTest(Icon) {
  return () => {
    const stroke = "#coffee";
    const fill = "#facade";

    const tree = render(<Icon strokeColour={stroke} fillColour={fill} />);

    expect(tree.find(`[stroke="${stroke}"]`).length > 0).toEqual(true);
    expect(tree.find(`[fill="${fill}"]`).length > 0).toEqual(true);
  };
}

function iconDimensionTest(Icon) {
  return () => {
    const tree = shallow(<Icon height={50} />);
    expect(tree.find("Svg").props().width > 0).toEqual(true);
  };
}

module.exports = () => {
  Object.entries(Icons).forEach(([name, Icon]) => {
    it(`${name} renders correctly`, iconRenderTest(name, Icon));
    it(`${name} renders with different colours`, iconColourTest(Icon));
    it(`${name} sets a width when height is set`, iconDimensionTest(Icon));
  });
};
