import "react-native";
import React from "react";
import { shallow } from "enzyme";
import BrightcoveVideo from "../src/brightcove-video";

export const defaultProps = {
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
    const tree = shallow(<BrightcoveVideo {...defaultProps} />);
    expect(tree).toMatchSnapshot();
  })
};
