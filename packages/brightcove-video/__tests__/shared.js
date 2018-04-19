import "react-native";
import React from "react";
import { shallow } from "enzyme";
import BrightcoveVideo from "../src/brightcove-video";
import PlayIcon from "../src/play-icon";

export const defaultVideoProps = {
  accountId: "[account id]",
  playerId: "[player id]",
  videoId: "[video id]",
  policyKey: "[policy key]",
  poster: { uri: "[poster uri]"},
  paidonly: false,
  width: 300,
  height: 200,
  onVideoPress: () => {}
};

export default () => {
  it("renders correctly", () => {
    const tree = shallow(<BrightcoveVideo {...defaultVideoProps} />);
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly without a poster image", () => {
    const tree = shallow(<BrightcoveVideo {...defaultVideoProps} poster={null} />);
    expect(tree).toMatchSnapshot();
  });

  it("renders a play icon correctly", () => {
    const tree = shallow(<PlayIcon />);
    expect(tree).toMatchSnapshot();
  });
};
