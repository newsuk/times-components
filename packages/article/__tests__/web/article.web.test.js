import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";
import Article from "../../article";
import shared from "../shared";

const articleFixtureNoLeadAsset = require("../../fixtures/no-lead-asset.json");

describe("Article test on web", () => {
  const adConfig = {
    networkId: "mockNetwork",
    adUnit: "mockAdUnit",
    pageTargeting: {
      title: "Title"
    },
    slotTargeting: {
      path: "/news"
    }
  };

  shared();

  it("renders article with no lead asset", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoLeadAsset.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
