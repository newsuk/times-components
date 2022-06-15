import React from "react";
import { TcText } from "@times-components/utils";
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
            <TcText>A card</TcText>
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
            <TcText>A card with an empty image</TcText>
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
            <TcText>No image</TcText>
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
            <TcText>No URI</TcText>
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
            <TcText>A card in reverse</TcText>
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
            <TcText>A card in reverse with no image</TcText>
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
            <TcText>Loading state</TcText>
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
            <TcText>Loading with no image</TcText>
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
            <TcText>Loading in reverse</TcText>
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
            <TcText>Loading in reverse with no image</TcText>
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
            <TcText>Do not re-render me</TcText>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();

        testInstance.update(
          <Card {...props} imageRatio={16 / 9}>
            <TcText>Do not re-render me</TcText>
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
            <TcText>Some text</TcText>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();

        testInstance.update(
          <Card {...props} imageUri="http://foo">
            <TcText>Some text</TcText>
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
            <TcText>Some content</TcText>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();

        testInstance.update(
          <Card {...props} lowResSize={null}>
            <TcText>Some content</TcText>
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
            <TcText>Some content</TcText>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();

        testInstance.update(
          <Card {...props} highResSize={null}>
            <TcText>Some content</TcText>
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
            <TcText>Re-render me</TcText>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();

        testInstance.update(
          <Card {...props} isLoading={false}>
            <TcText>Re-render me</TcText>
          </Card>
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
