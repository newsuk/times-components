import React from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { scales } from "@times-components/styleguide";
import "./mock-text-measure-module";
import DropCapWithContext from "../src/drop-cap-with-context";
import DropCap from "../src/drop-cap";

const mockDropCap = "I";
const mockText =
  "n 1924 Harold Macmillan became MP for Stockton-on-Tees. Witnessing brutal poverty there between the wars, he said later that he had learnt “lessons which I have never forgotten. ";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(print, minimalNativeTransform, flattenStyleTransform)
  );

  it("paragraph with single drop cap", () => {
    const testInstance = TestRenderer.create(
      <DropCapWithContext dropCap={mockDropCap} text={mockText} />
    );

    expect(testInstance).toMatchSnapshot();
  });

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
