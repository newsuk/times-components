import "react-native";
import React from "react";
import GPT from "./gpt.web";
import AdManager from "./ad-manager";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const adManager = new AdManager({
    networkId: "25436805",
    adUnit: "d.thetimes.co.uk",
    section: "article"
  });

  const tree = renderer
    .create(<GPT adManager={adManager} code="ad-header" />)
    .toJSON();

  expect(tree).toBeTruthy();
});
