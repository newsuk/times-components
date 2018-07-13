import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalNativeTransform,
  print,
  propsNoChildren,
  replaceTransform
} from "@times-components/jest-serializer";
import iterator from "@times-components/test-utils";
import KeyFacts from "../src/key-facts";
import data from "../fixtures/key-facts.json";

const { data: { children, attributes } } = data;

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key === "style"),
      replaceTransform({
        TextLink: propsNoChildren
      })
    )
  );

  const tests = [
    {
      name: "key facts with title",
      test: () => {
        const wrapper = shallow(
          <KeyFacts
            items={children[0].children}
            onLinkPress={() => {}}
            title={attributes.title}
          />
        );

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "key facts without title",
      test: () => {
        const wrapper = shallow(
          <KeyFacts items={children[0].children} onLinkPress={() => {}} />
        );

        expect(wrapper).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
