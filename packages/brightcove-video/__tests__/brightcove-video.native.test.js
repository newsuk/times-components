/* eslint-env jest */

import "react-native";
import React, { Component } from "react";
import renderer from "react-test-renderer";
import BrightcoveVideo from "../brightcove-video.native";

describe("brightcove-video native component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("width x height default to 320 x 180", () => {
    const tree = renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />)
      .toJSON();

    expect(tree.props.style.width).toBe(320);
    expect(tree.props.style.height).toBe(180);
  });

  it("width x height can be overridden", () => {
    const tree = renderer
      .create(
        <BrightcoveVideo
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          height={400}
          width={600}
        />
      )
      .toJSON();

    expect(tree.props.style.width).toBe(600);
    expect(tree.props.style.height).toBe(400);
  });

  it("passes accountId, videoId & policyId to video correctly", () => {
    const tree = renderer
      .create(
        <BrightcoveVideo
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyId="[POLICY_ID]"
        />
      )
      .toJSON();

    expect(tree.props.policyId).toBe("[POLICY_ID]");
    expect(tree.props.videoId).toBe("[VIDEO_ID]");
    expect(tree.props.accountId).toBe("[ACCOUNT_ID]");
  });

  describe("mock RNTBrightcove", () => {
    let getNativeBrightcoveComponentSpy;
    let mockRNTBrightcove;
    let propsCache;

    beforeEach(() => {
      mockRNTBrightcove = class extends Component {
        constructor(props) {
          super(props);
          propsCache = props;
        }
        render() {
          return null;
        }
      };

      getNativeBrightcoveComponentSpy = jest
        .spyOn(BrightcoveVideo, "getNativeBrightcoveComponent")
        .mockImplementation(() => mockRNTBrightcove);
    });

    afterEach(() => {
      getNativeBrightcoveComponentSpy.mockRestore();
    });

    it("will propagate change events from the native component", done => {
      renderer.create(
        <BrightcoveVideo
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyId="[POLICY_ID]"
          onChange={evt => {
            expect(evt).toBe("random act of kindness");
            done();
          }}
        />
      );

      propsCache.onChange({ nativeEvent: "random act of kindness" });
    });

    it("will not error if there is no chnage handler", () => {
      renderer.create(
        <BrightcoveVideo
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyId="[POLICY_ID]"
        />
      );

      propsCache.onChange({ nativeEvent: "random act of kindness" });
    });
  });
});
