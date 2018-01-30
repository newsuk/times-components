import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import Puff from "../puff";
import Link from "@times-components/link";
import puffProps from "../fixtures/puff-props";

module.exports = () => {
  it("renders correctly when all props are provided", () => {
    const tree = renderer.create(<Puff {...puffProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly without a section", () => {
    const tree = renderer
      .create(<Puff {...puffProps} sectionName={undefined} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly without a label", () => {
    const tree = renderer.create(<Puff {...puffProps} label={null} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly without an image", () => {
    const tree = renderer.create(<Puff {...puffProps} image={null} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with custom link text", () => {
    const tree = renderer
      .create(<Puff {...puffProps} linkText="Read the feature" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("calls the onPress prop function when pressed", () => {
    const onPressMock = jest.fn();

    const wrapper = shallow(<Puff {...puffProps} onPress={onPressMock} />);

    wrapper.find(Link).simulate("press");

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
};
