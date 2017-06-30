import "react-native";
import React from "react";
import GPT from "./gpt.web";
import AdManager from "./ad-manager";
import renderer from "react-test-renderer";

import gptManager from "./gpt-manager";
import pbjsManager from "./pbjs-manager";
import { getSlotConfig } from "./generate-config";

describe("Gpt test", () => {
  let adManager;

  beforeEach(() => {
    adManager = new AdManager({
      networkId: "25436805",
      adUnit: "d.thetimes.co.uk",
      section: "article",
      gptManager,
      pbjsManager,
      getSlotConfig
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
