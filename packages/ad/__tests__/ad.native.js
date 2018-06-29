import React, { Fragment } from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import adConfig from "../fixtures/article-ad-config.json";
import Ad, { AdComposer } from "../src/ad";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimaliseTransform((value, key) => key === "style"),
      minimalNativeTransform,
      flattenStyleTransform
    )
  );

  const articleContextURL =
    "https://www.thetimes.co.uk/edition/news/france-defies-may-over-russia-37b27qd2s";

  it("one ad slot", () => {
    const testInstance = TestRenderer.create(
      <AdComposer adConfig={adConfig}>
        <Ad contextUrl={articleContextURL} section="news" slotName="header" />
      </AdComposer>
    );

    expect(testInstance).toMatchSnapshot("1. Advert");
  });

  it("two ad slots", () => {
    const testInstance = TestRenderer.create(
      <AdComposer adConfig={adConfig}>
        <Fragment>
          <Ad contextUrl={articleContextURL} section="news" slotName="header" />
          <Ad
            contextUrl={articleContextURL}
            section="news"
            slotName="intervention"
          />
        </Fragment>
      </AdComposer>
    );

    expect(testInstance).toMatchSnapshot("2. Two adverts");
  });

  it("ad placeholder when isLoading prop is true", () => {
    const testInstance = TestRenderer.create(
      <AdComposer adConfig={adConfig}>
        <Ad
          contextUrl={articleContextURL}
          isLoading
          section="news"
          slotName="header"
        />
      </AdComposer>
    );

    expect(testInstance).toMatchSnapshot("3. Advert loading state placeholder");
  });
};
