import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  minimalWebTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";
import shared from "../ad-placeholder.shared";
import AdPlaceholder from "../../src/ad-placeholder";

describe("Web", () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalWebTransform,
      rnwTransform()
    )
  );

  it("should render an advert placeholder", () => {
    const wrapper = renderer.create(<AdPlaceholder height={300} width={970} />);

    expect(wrapper).toMatchSnapshot("1. Advert placeholder");
  });

  shared();
});
