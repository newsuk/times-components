import React from "react";
import { shallow } from "enzyme";
import AdPlaceholder from "../src/ad-placeholder";

export default () => {
  it("should render an advert placeholder", () => {
    const wrapper = shallow(<AdPlaceholder height={300} width={970} />);

    expect(wrapper).toMatchSnapshot("1. Advert placeholder");
  });
};
