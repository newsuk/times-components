import "react-native";
import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  enzymeRootSerializer
} from "@times-components/jest-serializer";
import {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
} from "../src/article-flag";

export default () => {
  addSerializers(expect, enzymeRootSerializer());

  it("new article flag", () => {
    const wrapper = shallow(<NewArticleFlag />);

    expect(wrapper).toMatchSnapshot();
  });

  it("updated article flag", () => {
    const wrapper = shallow(<UpdatedArticleFlag />);

    expect(wrapper).toMatchSnapshot();
  });

  it("exclusive article flag", () => {
    const wrapper = shallow(<ExclusiveArticleFlag />);

    expect(wrapper).toMatchSnapshot();
  });

  it("sponsored artilce flag", () => {
    const wrapper = shallow(<SponsoredArticleFlag />);

    expect(wrapper).toMatchSnapshot();
  });
};
