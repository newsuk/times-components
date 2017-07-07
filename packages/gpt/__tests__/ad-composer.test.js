import React from "react";
import renderer from "react-test-renderer";

import AdComposer from "../ad-composer";
import Ad from "../ad";

describe("AdComposer", () => {
  it("renders no ad slots", () => {
    const tree = renderer.create(<AdComposer section="article" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders with one ad slot", () => {
    const tree = renderer
      .create(
        <AdComposer section="article">
          <Ad code="ad-header" />
        </AdComposer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders with more than one ad slot", () => {
    const tree = renderer
      .create(
        <AdComposer section="article">
          <Ad code="ad-header" />
          <Ad code="intervention" />
        </AdComposer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
