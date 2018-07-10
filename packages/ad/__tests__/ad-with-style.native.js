import React, { Fragment } from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  hoistStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import adInit from "../src/utils/ad-init";
import adConfig from "../fixtures/article-ad-config.json";
import Ad, { AdComposer } from "../src/ad";

jest.mock("../src/utils/ad-init");
jest.mock("../src/ad-placeholder", () => "AdPlaceholder");
adInit.mockImplementation(() => ({
  init: () => {},
  destroySlots: () => {}
}));

const props = {
  contextUrl:
    "https://www.thetimes.co.uk/edition/news/france-defies-may-over-russia-37b27qd2s",
  section: "news",
  style: {
    backgroundColor: "red"
  }
};

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      flattenStyleTransform,
      hoistStyleTransform,
      minimaliseTransform(
        (value, key) => key === "source" || key === "injectedJavaScript"
      )
    )
  );

  it("should render multiple ad slots", () => {
    const testInstance = TestRenderer.create(
      <AdComposer adConfig={adConfig}>
        <Fragment>
          <Ad {...props} slotName="header" />
          <Ad {...props} slotName="pixel" />
        </Fragment>
      </AdComposer>
    );

    const AdComponent = testInstance.root.findAllByType(Ad);
    AdComponent[0].instance.setAdReady();
    AdComponent[1].instance.setAdReady();

    expect(testInstance).toMatchSnapshot("1. multiple adverts");
  });

  it("should render only the placeholder when isLoading", () => {
    const testInstance = TestRenderer.create(
      <AdComposer adConfig={adConfig}>
        <Fragment>
          <Ad {...props} isLoading slotName="header" />
        </Fragment>
      </AdComposer>
    );

    expect(testInstance).toMatchSnapshot(
      "2. loading state advert shows placeholder only"
    );
  });

  it("should return null if there is an error in the loading of scripts", () => {
    const testInstance = TestRenderer.create(
      <AdComposer adConfig={adConfig}>
        <Fragment>
          <Ad {...props} slotName="header" />
        </Fragment>
      </AdComposer>
    );

    const AdComponent = testInstance.root.findByType(Ad);
    AdComponent.instance.setAdError();

    expect(testInstance).toMatchSnapshot(
      "3. should not show when loading scripts errored"
    );
  });
};
