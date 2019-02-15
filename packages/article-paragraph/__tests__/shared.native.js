import React from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import { scales } from "@times-components/styleguide";
import {
  addSerializers,
  compose,
  minimalNativeTransform,
  minimaliseTransform,
  flattenStyleTransform,
  print
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import coreRenderers from "@times-components/markup";
import shared, { callAllLayouts } from "./shared.base";
import "./mock-text-measure-module";
import DropCap from "../src/drop-cap";
import paragraphData from "./fixtures/paragraph-showcase.json";

const mockDropCap = "I";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      flattenStyleTransform,
      minimaliseTransform((value, key) => key === "style")
    )
  );

  iterator([
    ...shared(),
    {
      name: "re-measures when scale changes",
      test: async () => {
        const testInstance = TestRenderer.create(
          <DropCap
            dropCap={mockDropCap}
            localRender={coreRenderers}
            scale={scales.large}
            text={[paragraphData]}
          />
        );

        await callAllLayouts(testInstance);

        expect(
          testInstance.root.findAllByType(Text)[0].props.style[0].fontSize
        ).toBe(115);
        testInstance.update(
          <DropCap
            dropCap={mockDropCap}
            localRender={coreRenderers}
            scale={scales.xlarge}
            text={[paragraphData]}
          />
        );

        await callAllLayouts(testInstance);

        expect(
          testInstance.root.findAllByType(Text)[0].props.style[0].fontSize
        ).toBe(124);
      }
    }
  ]);
};
