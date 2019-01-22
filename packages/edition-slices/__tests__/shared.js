import React from "react";
import TestRenderer from "react-test-renderer";
import leadOneAndOneData from "../fixtures/leadoneandone";
import { PrimaryTile } from "../src/tiles";
import { LeadOneFullWidthSlice, LeadOneAndOneSlice } from "../src/slices";

export default () => {
  // Tiles
  it("primary tile", () => {
    const testInstance = TestRenderer.create(
      <PrimaryTile tile={leadOneAndOneData.lead} withImage />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });

  it("primary tiles without image", () => {
    const testInstance = TestRenderer.create(
      <PrimaryTile tile={leadOneAndOneData.lead} withImage={false} />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });

  it("lead one full width slice", () => {
    const testInstance = TestRenderer.create(
      <LeadOneFullWidthSlice lead={leadOneAndOneData.lead} />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
  it("lead one and one slice", () => {
    const testInstance = TestRenderer.create(
      <LeadOneAndOneSlice
        lead={leadOneAndOneData.lead}
        support={leadOneAndOneData.support}
      />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
