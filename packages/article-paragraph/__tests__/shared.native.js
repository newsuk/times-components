import React from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import { scales } from "@times-components/styleguide";
import {
  addSerializers,
  compose,
  minimalNativeTransform,
  flattenStyleTransform,
  print
} from "@times-components/jest-serializer";
import shared from "./shared.base";
import "./mock-text-measure-module";
import DropCap from "../src/drop-cap";

const mockDropCap = "I";
const mockText =
  "n 1924 Harold Macmillan became MP for Stockton-on-Tees. Witnessing brutal poverty there between the wars, he said later that he had learnt “lessons which I have never forgotten. ";

export default () => {
  addSerializers(
    expect,
    compose(print, minimalNativeTransform, flattenStyleTransform)
  );

  shared();

  it("re-measures when scale changes", () => {
    const testInstance = TestRenderer.create(
      <DropCap dropCap={mockDropCap} scale={scales.large} text={mockText} />
    );

    expect(
      testInstance.root.findAllByType(Text)[0].props.style[0].fontSize
    ).toBe(115);
    testInstance.update(
      <DropCap dropCap={mockDropCap} scale={scales.xlarge} text={mockText} />
    );

    expect(
      testInstance.root.findAllByType(Text)[0].props.style[0].fontSize
    ).toBe(124);
  });
};
