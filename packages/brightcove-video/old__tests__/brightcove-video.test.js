import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import BrightcoveVideo from "../src/brightcove-video";

const defaultProps = {
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

describe("BrightcoveVideo native", () => {

  it("renders correctly", () => {
    const tree = shallow(<BrightcoveVideo {...defaultProps} />);

    expect(tree).toMatchSnapshot();
  })
});
