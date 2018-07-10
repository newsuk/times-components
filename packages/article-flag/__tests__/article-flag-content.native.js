import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  enzymeTreeSerializer
} from "@times-components/jest-serializer";
import iterator from "@times-components/test-utils";
import ArticleFlag from "../src/article-flag";

export default () => {
  addSerializers(expect, enzymeTreeSerializer());

  const tests = [
    {
      name: "article flag",
      test: () => {
        const wrapper = shallow(<ArticleFlag title="No Colour" />);

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "red article flag",
      test: () => {
        const wrapper = shallow(
          <ArticleFlag color="red" title="Coloured Red" />
        );

        expect(wrapper).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
