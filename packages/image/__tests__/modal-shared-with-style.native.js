import React from "react";
import { Text, View } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import Responsive from "@times-components/responsive";
import { setIsTablet } from "./mocks";

import ModalImage from "../src/modal-image";

jest.mock("react-native-image-zoom-viewer", () => "ImageZoomView");

// eslint-disable-next-line react/prop-types
const MockCaption = ({ style: { text, caption, credits, container } }) => (
  <View style={container}>
    <Text style={{ ...text, ...caption }}>Caption</Text>
    <Text style={{ ...text, ...credits }}>Credits</Text>
  </View>
);

const props = {
  caption: <MockCaption />,
  uri: "http://example.com/image.jpg?crop=1016%2C677%2C0%2C0"
};

function callOnLayout(testRenderer, layout = { height: 700, width: 350 }) {
  testRenderer.root.children[0].instance.onLowResLayout({
    nativeEvent: { layout }
  });
}

jest.useFakeTimers();

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key !== "style"),
      flattenStyleTransform
    )
  );

  const tests = [
    {
      name: "landscape default modal",
      test: async () => {
        const testRenderer = TestRenderer.create(
          <Responsive>
            <ModalImage {...props} aspectRatio={2} />
          </Responsive>
        );

        await act(async () => {
          jest.runAllImmediates();
        });

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "portrait default modal",
      test: async () => {
        const testRenderer = TestRenderer.create(
          <Responsive>
            <ModalImage {...props} aspectRatio={0.5} />
          </Responsive>
        );
        await act(async () => {
          jest.runAllImmediates();
        });

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "tablet landscape default modal",
      test: async () => {
        setIsTablet(true);
        const testRenderer = TestRenderer.create(
          <Responsive>
            <ModalImage {...props} aspectRatio={2} />
          </Responsive>
        );

        await act(async () => {
          jest.runAllImmediates();
        });

        callOnLayout(testRenderer, { height: 1400, width: 700 });

        await act(async () => {
          jest.runAllImmediates();
        });

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "tablet portrait default modal",
      test: async () => {
        setIsTablet(true);
        const testRenderer = TestRenderer.create(
          <Responsive>
            <ModalImage {...props} aspectRatio={0.5} />
          </Responsive>
        );
        await act(async () => {
          jest.runAllImmediates();
        });

        callOnLayout(testRenderer, { height: 700, width: 1400 });

        await act(async () => {
          jest.runAllImmediates();
        });

        expect(testRenderer).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
