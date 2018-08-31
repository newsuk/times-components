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
  highResSize: 800,
  imageRatio: 2 / 3,
  imageUri: "https://img.io/img",
  lowResSize: 50,
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
        CardContent: justChildren,
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
          imageUri: "http://foo"
        });

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "card should re-render when low res size changes",
      test: () => {
        const wrapper = shallow(
          <Card {...props}>
            <Text>Some content</Text>
          </Card>
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.setProps({
          lowResSize: null
        });

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "card should re-render when high res size changes",
      test: () => {
        const wrapper = shallow(
          <Card {...props}>
            <Text>Some content</Text>
          </Card>
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.setProps({
          highResSize: null
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
