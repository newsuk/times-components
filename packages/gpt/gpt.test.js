import "react-native";
import React from "react";
import GPT from "./gpt.web";
import AdManager from "./ad-manager";
import renderer from "react-test-renderer";

describe("Gpt test", () => {
  let adManager;

  beforeEach(() => {
    adManager = new AdManager({
      networkId: "25436805",
      adUnit: "d.thetimes.co.uk",
      section: "article",
      gptManager: require("./gpt-manager").default,
      pbjsManager: require("./pbjs-manager").default
    });
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(<GPT adManager={adManager} code="ad-header" />)
      .toJSON();

    expect(tree).toBeTruthy();
  });

  it("renders a snapshot", () => {
    const tree = renderer
      .create(<GPT adManager={adManager} code="ad-header" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
