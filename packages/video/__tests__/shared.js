import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Video from "../src/video";
import PlayIcon from "../src/play-icon";

export const defaultVideoProps = {
  accountId: "[account id]",
  playerId: "[player id]",
  videoId: "[video id]",
  policyKey: "[policy key]",
  poster: {
    uri:
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  },
  paidOnly: false,
  width: 300,
  height: 200,
  onVideoPress: () => {}
};

export default () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Video {...defaultVideoProps} />);
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly without a poster image", () => {
    const tree = renderer.create(
      <Video {...defaultVideoProps} poster={null} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders a play icon correctly", () => {
    const tree = renderer.create(<PlayIcon />);
    expect(tree).toMatchSnapshot();
  });
};
