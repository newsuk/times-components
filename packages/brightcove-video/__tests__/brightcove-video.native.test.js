import "react-native";
import React, { Component } from "react";
import BrightcoveVideo from "../brightcove-video.native";
import renderer from "react-test-renderer";

describe("brightcove-video native component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("width x height default to 100% x 100%", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(tree.props.style.width).toBe("100%");
    expect(tree.props.style.height).toBe("100%");
  });

  it("width x height can be overridden", () => {
    const tree = renderer
      .create(<BrightcoveVideo height={400} width={600} />)
      .toJSON();

    expect(tree.props.style.width).toBe(600);
    expect(tree.props.style.height).toBe(400);
  });

  it("passes accountId & videoId to video correctly", () => {
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
    let getNativeBrightcoveComponent, mockRNTBrightcove, propsCache;

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
        .spyOn(BrightcoveVideo.prototype, "getNativeBrightcoveComponent")
        .mockImplementation(() => {
          return mockRNTBrightcove;
        });
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
