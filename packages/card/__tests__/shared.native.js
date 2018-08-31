import React from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared.base";
import Card from "../src/card";

jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/gradient", () => "Gradient");

const props = {
  highResSize: 600,
  imageRatio: 2 / 3,
  imageUri: "https://img.io/img",
  lowResSize: 100,
  showImage: true
};

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform(
        (value, key) => key === "style" || key.includes("Class")
      )
    )
  );

  const tests = [
    {
      name: "card should not re-render when imageRatio prop is changed",
      test: () => {
        const testInstance = TestRenderer.create(
          <Card {...props}>
            <Text>Do not re-render me</Text>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();

        testInstance.update(
          <Card {...props} imageRatio={16 / 9}>
            <Text>Do not re-render me</Text>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "card should re-render when image uri changes",
      test: () => {
        const testInstance = TestRenderer.create(
          <Card {...props}>
            <Text>Some text</Text>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();

        testInstance.update(
          <Card {...props} imageUri="http://foo">
            <Text>Some text</Text>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "card should re-render when low res size changes",
      test: () => {
        const testInstance = TestRenderer.create(
          <Card {...props}>
            <Text>Some content</Text>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();

        testInstance.update(
          <Card {...props} lowResSize={null}>
            <Text>Some content</Text>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "card should re-render when high res size changes",
      test: () => {
        const testInstance = TestRenderer.create(
          <Card {...props}>
            <Text>Some content</Text>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();

        testInstance.update(
          <Card {...props} highResSize={null}>
            <Text>Some content</Text>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "card should re-render when loading state changes",
      test: () => {
        const testInstance = TestRenderer.create(
          <Card {...props} isLoading>
            <Text>Re-render me</Text>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();

        testInstance.update(
          <Card {...props} isLoading={false}>
            <Text>Re-render me</Text>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  shared(TestRenderer.create, tests);
};
