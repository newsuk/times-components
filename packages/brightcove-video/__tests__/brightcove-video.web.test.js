import "react-native";
import React from "react";
import BrightcoveVideo from "../brightcove-video.web";
import renderer from "react-test-renderer";

describe("brightcove-video web component", () => {
  let appendChildMock, dummyElem;

  beforeEach(() => {
    appendChildMock = jest.fn();
    dummyElem = {};

    global.document = {
      createElement: () => dummyElem,
      body: {
        appendChild: appendChildMock
      }
    };
  });

  afterEach(() => {
    delete global.document;
  });

  it("renders correctly", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(tree).toBeTruthy();
    expect(tree.type).toBe("View");
    expect(tree.children.length).toBe(1);
  });

  it("appends script tag to body", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(appendChildMock.mock.calls.length).toBe(1);
    expect(appendChildMock.mock.calls[0][0]).toBe(dummyElem);
  });

  it("width x height default to 150 x 100", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(tree.props.style.width).toBe(150);
    expect(tree.props.style.height).toBe(100);
  });

  it("width x height can be overridden", () => {
    const tree = renderer
      .create(<BrightcoveVideo height={400} width={600} />)
      .toJSON();

    expect(tree.props.style.width).toBe(600);
    expect(tree.props.style.height).toBe(400);
  });

  it("generates the correct script link", () => {
    const tree = renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" />)
      .toJSON();

    expect(dummyElem.src).toBe(
      "//players.brightcove.net/[ACCOUNT_ID]/default_default/index.min.js"
    );
  });

  it("passes accountId & videoId to video correctly", () => {
    const tree = renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />)
      .toJSON();

    expect(tree.children[0].props["data-video-id"]).toBe("[VIDEO_ID]");
    expect(tree.children[0].props["data-account"]).toBe("[ACCOUNT_ID]");
  });
});
