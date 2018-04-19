/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { colours } from "@times-components/styleguide";
import {
  IconDiamond,
  IconTwitter,
  IconVideo,
  IconEmail,
  IconStar
} from "../src/icons";

module.exports = () => {
  it("Diamond renders correctly", () => {
    const tree = renderer
      .create(
        <IconDiamond
          width={50}
          height={50}
          fillColour={colours.functional.tertiary}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Twitter renders correctly", () => {
    const tree = renderer
      .create(<IconTwitter width={50} height={50} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Twitter renders correctly with different fillColour", () => {
    const tree = renderer
      .create(
        <IconTwitter
          width={50}
          height={50}
          fillColour={colours.functional.tertiary}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Video renders correctly", () => {
    const tree = renderer.create(<IconVideo width={50} height={50} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Video renders correctly with different fillColour", () => {
    const tree = renderer
      .create(<IconVideo width={50} height={50} fillColour="#4D4D4D" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Email renders correctly", () => {
    const tree = renderer.create(<IconEmail width={50} height={50} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Email renders correctly with different fillColour", () => {
    const tree = renderer
      .create(<IconEmail width={50} height={50} fillColour="#4D4D4D" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Star renders correctly", () => {
    const tree = renderer.create(<IconStar width={50} height={50} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Star renders correctly with different fillColour", () => {
    const tree = renderer
      .create(<IconStar width={50} height={50} fillColour="#4D4D4D" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
