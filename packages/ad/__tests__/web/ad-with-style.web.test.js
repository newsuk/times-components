import React, { Fragment } from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  hoistStyleTransform,
  justChildren,
  minimaliseTransform,
  minimalWebTransform,
  propsNoChildren,
  replaceTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import adInit from "../../src/utils/ad-init";
import adConfig from "../../fixtures/article-ad-config.json";
import Ad, { AdComposer } from "../../src/ad";

jest.mock("../../src/utils/ad-init");
adInit.mockImplementation(() => ({
  init: () => {},
  destroySlots: () => {}
}));

const props = {
  contextUrl: "https://www.thetimes.co.uk",
  section: "news"
};

describe("web", () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      stylePrinter,
      flattenStyleTransform,
      hoistStyleTransform,
      minimalWebTransform,
      minimaliseTransform((value, key) => key === "adConfig" || key === "data"),
      replaceTransform({
        Broadcast: justChildren,
        Subscriber: justChildren,
        Watermark: propsNoChildren
      }),
      rnwTransform()
    )
  );

  it("should render multiple ad slots", () => {
    const wrapper = mount(
      <AdComposer adConfig={adConfig}>
        <Fragment>
          <Ad {...props} slotName="header" />
          <Ad {...props} slotName="pixel" />
          <Ad {...props} slotName="intervention" />
        </Fragment>
      </AdComposer>
    );

    wrapper.find("Ad").forEach(node => {
      node.instance().setAdReady();
    });

    wrapper.update();

    expect(wrapper).toMatchSnapshot("1. multiple adverts");
  });

  it("should render only the placeholder when isLoading", () => {
    const wrapper = mount(
      <AdComposer adConfig={adConfig}>
        <Fragment>
          <Ad {...props} isLoading slotName="header" />
        </Fragment>
      </AdComposer>
    );

    const AdComponent = wrapper.find("Ad");

    expect(AdComponent).toMatchSnapshot(
      "2. loading state advert shows placeholder only"
    );
  });

  it("should render nothing if there is an error in the loading of scripts", () => {
    const wrapper = mount(
      <AdComposer adConfig={adConfig}>
        <Fragment>
          <Ad {...props} slotName="header" />
        </Fragment>
      </AdComposer>
    );

    const AdComponent = wrapper.find("Ad");

    AdComponent.at(0)
      .instance()
      .setAdError();

    wrapper.update();

    expect(AdComponent).toMatchSnapshot(
      "3. should not show when loading scripts errored"
    );
  });
});
