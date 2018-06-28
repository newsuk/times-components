import React, { Fragment } from "react";
import renderer from "react-test-renderer";
import Ad, { AdComposer } from "../src/ad";

export default () => {
  it("renders with one ad slot", () => {
    const tree = renderer
      .create(
        <AdComposer>
          <Ad slotName="header" />
        </AdComposer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot("1. Advert");
  });

  it("renders with more than one ad slot", () => {
    const tree = renderer
      .create(
        <AdComposer>
          <Fragment>
            <Ad slotName="header" />
            <Ad slotName="intervention" />
          </Fragment>
        </AdComposer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot("2. Two adverts");
  });

  it("renders placeholder when isLoading prop is true", () => {
    const tree = renderer
      .create(
        <AdComposer>
          <Ad isLoading slotName="header" />
        </AdComposer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot("3. Advert loading state placeholder");
  });
};
