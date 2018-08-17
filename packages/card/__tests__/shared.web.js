import React from "react";
import { AppRegistry } from "react-native-web";
import { Text } from "react-native";
import { shallow, mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  justChildren,
  meltNative,
  minimaliseTransform,
  minimalWebTransform,
  print,
  propsNoChildren,
  replaceTransform,
  rnwTransform
} from "@times-components/jest-serializer";
import shared from "./shared.base";
import Card from "../src/card";

const props = {
  image: {
    uri: "https://img.io/img"
  },
  imageRatio: 2 / 3,
  imageSize: 360,
  showImage: true
};

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => key === "style" || key === "className"
      ),
      replaceTransform({
        CardComponent: justChildren,
        Gradient: propsNoChildren,
        Loading: justChildren,
        TimesImage: propsNoChildren,
        ...meltNative
      }),
      rnwTransform(AppRegistry)
    )
  );

  const tests = [
    {
      name: "card should not re-render when imageRatio prop is changed",
      test: () => {
        const wrapper = shallow(
          <Card {...props}>
            <Text>Do not re-render me</Text>
          </Card>
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.setProps({
          imageRatio: 16 / 9
        });

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "card should re-render when image uri changes",
      test: () => {
        const wrapper = shallow(
          <Card {...props}>
            <Text>Some text</Text>
          </Card>
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.setProps({
          image: { uri: "http://foo" }
        });

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "card should re-render when image size changes",
      test: () => {
        const wrapper = shallow(
          <Card {...props}>
            <Text>Some content</Text>
          </Card>
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.setProps({
          imageSize: null
        });

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "card should re-render when loading state changes",
      test: () => {
        const wrapper = shallow(
          <Card {...props} isLoading>
            <Text>Re-render me</Text>
          </Card>
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.setProps({
          isLoading: false
        });

        expect(wrapper).toMatchSnapshot();
      }
    }
  ];

  shared(mount, tests);
};
