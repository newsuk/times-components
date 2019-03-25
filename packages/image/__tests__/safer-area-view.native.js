import React from "react";
import { SafeAreaView, Text } from "react-native";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import {
  addSerializers,
  compose,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import "./mocks";

const SaferAreaView = require.requireActual("../src/safer-area-view").default;

const getLayoutEventForWidth = width => ({
  nativeEvent: { layout: { height: width / 2, width } }
});

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform
    )
  );

  const tests = [
    {
      name: "does not render children before second onLayout",
      test: () => {
        const testRenderer = TestRenderer.create(
          <SaferAreaView>
            <Text>SHOULD NOT RENDER</Text>
          </SaferAreaView>
        );

        testRenderer.root
          .findByType(SafeAreaView)
          .props.onLayout(getLayoutEventForWidth(700));

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "does render children after second onLayout",
      test: () => {
        const testRenderer = TestRenderer.create(
          <SaferAreaView>
            <Text>SHOULD RENDER</Text>
          </SaferAreaView>
        );
        const safeAreaView = testRenderer.root.findByType(SafeAreaView);
        const evt = getLayoutEventForWidth(700);

        safeAreaView.props.onLayout(evt);
        safeAreaView.props.onLayout(evt);

        expect(testRenderer).toMatchSnapshot();
      }
    },
    {
      name: "does not call our onLayout before first SafeAreaView onLayout",
      test() {
        const onLayout = jest.fn();
        TestRenderer.create(
          <SaferAreaView onLayout={onLayout}>
            <Text>SHOULD NOT RENDER</Text>
          </SaferAreaView>
        );

        expect(onLayout).not.toHaveBeenCalled();
      }
    },
    {
      name: "does not call our onLayout before third SafeAreaView on layout",
      test() {
        const onLayout = jest.fn();
        const testRenderer = TestRenderer.create(
          <SaferAreaView onLayout={onLayout}>
            <Text>SHOULD NOT RENDER</Text>
          </SaferAreaView>
        );
        const safeAreaView = testRenderer.root.findByType(SafeAreaView);
        const evt = getLayoutEventForWidth(600);

        safeAreaView.props.onLayout(evt);
        safeAreaView.props.onLayout(evt);

        expect(onLayout).not.toHaveBeenCalled();
      }
    },
    {
      name: "does call our onLayout on third SafeAreaView on layout",
      test() {
        const onLayout = jest.fn();
        const testRenderer = TestRenderer.create(
          <SaferAreaView onLayout={onLayout}>
            <Text>SHOULD NOT RENDER</Text>
          </SaferAreaView>
        );
        const safeAreaView = testRenderer.root.findByType(SafeAreaView);
        const evt = getLayoutEventForWidth(600);

        safeAreaView.props.onLayout(evt);
        safeAreaView.props.onLayout(evt);
        safeAreaView.props.onLayout(evt);

        expect(onLayout).toHaveBeenCalled();
      }
    }
  ];

  iterator(tests);
};
