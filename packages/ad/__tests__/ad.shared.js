import React, { Fragment } from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRootSerializer,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";
import adConfig from "../fixtures/article-ad-config.json";
import Ad, { AdComposer } from "../src/ad";
import { AD_DEFAULT_BASE_URL } from "../src/utils/constants";

const props = {
  contextUrl: AD_DEFAULT_BASE_URL,
  section: "news",
  style: {
    backgroundColor: "red"
  }
};

export default () => {
  addSerializers(
    expect,
    enzymeRootSerializer(),
    compose(
      print,
      minimaliseTransform((value, key) => key === "style" || key === "value")
    )
  );

  it("advert", () => {
    const wrapper = shallow(
      <AdComposer adConfig={adConfig}>
        <Fragment>
          <Ad {...props} slotName="header" />
        </Fragment>
      </AdComposer>
    );

    expect(wrapper).toMatchSnapshot();
  });
};
