import React, { Fragment } from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  hoistStyleTransform,
  justChildren,
  minimalWebTransform,
  replaceTransform,
  stylePrinter,
  rnwTransform
} from "@times-components/jest-serializer";
import adConfig from "../../fixtures/article-ad-config.json";
import Ad, { AdComposer } from "../../src/ad";

describe("web", () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      stylePrinter,
      replaceTransform({
        Broadcast: justChildren
      }),
      minimalWebTransform,
      hoistStyleTransform,
      rnwTransform()
    )
  );

  const articleContextURL =
    "https://www.thetimes.co.uk/edition/news/france-defies-may-over-russia-37b27qd2s";

  it("one ad slot", () => {
    const wrapper = shallow(
      <AdComposer adConfig={adConfig}>
        <Ad contextUrl={articleContextURL} section="news" slotName="header" />
      </AdComposer>
    );

    expect(wrapper).toMatchSnapshot("1. Advert");
  });

  it("two ad slots", () => {
    const wrapper = shallow(
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

    expect(wrapper).toMatchSnapshot("2. Two adverts");
  });

  it("ad placeholder when isLoading prop is true", () => {
    const wrapper = shallow(
      <AdComposer adConfig={adConfig}>
        <Ad
          contextUrl={articleContextURL}
          isLoading
          section="news"
          slotName="header"
        />
      </AdComposer>
    );

    expect(wrapper).toMatchSnapshot("3. Advert loading state placeholder");
  });
});
