import React from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import Card from "../src/card";

const props = {
  highResSize: 360,
  imageRatio: 2 / 3,
  imageUri: "https://img.io/img",
  lowResSize: 50,
  showImage: true
};

export default renderMethod => {
  // magic to stop the React Native Animated library from dying, as each test kicks off another animation that uses timing
  jest.useFakeTimers();

  const tests = [
    {
      name: "card default state",
      test: () => {
        const output = renderMethod(
          <Card {...props}>
            <Text>A card</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "pass an empty state to the image component",
      test: () => {
        const output = renderMethod(
          <Card {...props} imageUri={null}>
            <Text>A card with an empty image</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card without an image when showImage is false",
      test: () => {
        const output = renderMethod(
          <Card {...props} showImage={false}>
            <Text>No image</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "pass an empty state to the image component when the uri is null",
      test: () => {
        const output = renderMethod(
          <Card {...props} imageUri={null}>
            <Text>No URI</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card with reversed layout",
      test: () => {
        const output = renderMethod(
          <Card {...props} isReversed>
            <Text>A card in reverse</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card with reversed layout and no image",
      test: () => {
        const output = renderMethod(
          <Card {...props} isReversed showImage={false}>
            <Text>A card in reverse with no image</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card with a loading state",
      test: () => {
        const output = renderMethod(
          <Card {...props} isLoading>
            <Text>Loading state</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card with a loading state and no image",
      test: () => {
        const output = renderMethod(
          <Card {...props} isLoading showImage={false}>
            <Text>Loading with no image</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card with reversed loading state",
      test: () => {
        const output = renderMethod(
          <Card {...props} isLoading isReversed>
            <Text>Loading in reverse</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card with reversed loading state with no image",
      test: () => {
        const output = renderMethod(
          <Card {...props} isLoading isReversed showImage={false}>
            <Text>Loading in reverse with no image</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
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

  iterator(tests);
};
