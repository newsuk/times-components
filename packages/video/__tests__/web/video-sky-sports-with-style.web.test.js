import React from "react";
import { AppRegistry } from "react-native-web";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  replacePropTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { hash, iterator } from "@times-components/test-utils";
import Video from "../../src/video";
import defaultVideoProps from "../default-video-props";

jest.mock("@times-components/image", () => "Image");

const styles = [
  "backgroundColor",
  "backgroundPosition",
  "backgroundRepeat",
  "backgroundSize",
  "height",
  "width"
];

addSerializers(
  expect,
  compose(
    stylePrinter,
    minimaliseTransform((value, key) => key !== "style"),
    minimalWebTransform,
    replacePropTransform((value, key) => {
      if (key === "src" || key === "poster") {
        return hash(value);
      }
      if (key === "style" && value.backgroundImage) {
        return hash(value.backgroundImage);
      }
      return value;
    }),
    rnwTransform(AppRegistry, styles)
  )
);

const tests = [
  {
    name: "video marked as sky sports",
    test: () => {
      const testInstance = TestRenderer.create(
        <Video {...defaultVideoProps} skySports />
      );

      expect(testInstance.toJSON()).toMatchSnapshot();
    }
  }
];

iterator(tests);
