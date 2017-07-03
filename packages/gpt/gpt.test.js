import "react-native";
import React from "react";
import GPT from "./gpt.web";
import renderer from "react-test-renderer";

import AdManager from "./ad-manager";
import { getSlotConfig } from "./generate-config";
import gptManager from "./gpt-manager";
import pbjs from "./pbjs-manager";
import { pbjs as pbjsConfig } from "./config";
const pbjsManager = pbjs(pbjsConfig);

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

  it("renders a snapshot", () => {
    const tree = renderer
      .create(<GPT adManager={adManager} code="ad-header" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
