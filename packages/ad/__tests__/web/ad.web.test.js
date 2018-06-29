import React, { Fragment } from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  hoistStyleTransform,
  justChildren,
  meltNative,
  minimaliseTransform,
  propsNoChildren,
  replaceTransform,
  stylePrinter,
  rnwTransform
} from "@times-components/jest-serializer";
import { delay } from "@times-components/utils";
import adConfig from "../../fixtures/article-ad-config.json";
import Ad, { AdComposer } from "../../src/ad";

describe("web", () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      stylePrinter,
      replaceTransform({
        AdComposer: justChildren,
        Broadcast: justChildren,
        DOMContext: propsNoChildren,
        ...meltNative
      }),
      minimaliseTransform((value, key) => key === "data"),
      hoistStyleTransform,
      rnwTransform()
    )
  );

  const articleContextURL =
    "https://www.thetimes.co.uk/edition/news/france-defies-may-over-russia-37b27qd2s";

  it.only("one ad slot", async () => {
    const wrapper = mount(
      <AdComposer adConfig={adConfig}>
        <Ad contextUrl={articleContextURL} section="colin" slotName="header" />
      </AdComposer>
    );

    await wrapper.find(Ad).instance().setAdReady();

    console.log("EXPECT");

    expect(wrapper).toMatchSnapshot("1. Advert");
  });

  // it("two ad slots", () => {
  //   const wrapper = mount(
  //     <AdComposer adConfig={adConfig}>
  //       <Fragment>
  //         <Ad slotName="header" />
  //         <Ad slotName="intervention" />
  //       </Fragment>
  //     </AdComposer>
  //   );


  //   expect(wrapper).toMatchSnapshot("2. Two adverts");
  // });

  // it("ad placeholder when isLoading prop is true", () => {
  //   const wrapper = mount(
  //     <AdComposer adConfig={adConfig}>
  //       <Ad isLoading slotName="header" />
  //     </AdComposer>
  //   );

  //   expect(wrapper).toMatchSnapshot("3. Advert loading state placeholder");
  // });
});
