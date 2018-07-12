import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  enzymeRootSerializer
} from "@times-components/jest-serializer";
import iterator from "@times-components/test-utils";
import {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
} from "../src/article-flag";

export default () => {
  addSerializers(expect, enzymeRootSerializer());

  const tests = [
    {
      name: "new article flag",
      test: () => {
        const wrapper = shallow(<NewArticleFlag />);

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "updated article flag",
      test: () => {
        const wrapper = shallow(<UpdatedArticleFlag />);

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "exclusive article flag",
      test: () => {
        const wrapper = shallow(<ExclusiveArticleFlag />);

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "sponsored article flag",
      test: () => {
        const wrapper = shallow(<SponsoredArticleFlag />);

        expect(wrapper).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
