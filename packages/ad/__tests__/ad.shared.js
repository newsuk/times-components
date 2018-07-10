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

const props = {
  contextUrl: "https://www.thetimes.co.uk",
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

  it("should render an advert", () => {
    const wrapper = shallow(
      <AdComposer adConfig={adConfig}>
        <Fragment>
          <Ad {...props} slotName="header" />
        </Fragment>
      </AdComposer>
    );

    expect(wrapper).toMatchSnapshot("1. advert");
  });
};
