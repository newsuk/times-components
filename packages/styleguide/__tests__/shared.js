import { Text } from "react-native";
import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import styleguide, { Animations, scales } from "../src/styleguide";

const tests = [
  {
    name: "Font factory default scale",
    test: () => {
      const testInstance = styleguide().fontFactory({
        font: "body",
        fontSize: "secondary"
      });
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "Font factory large scale",
    test: () => {
      const testInstance = styleguide({ scale: scales.large }).fontFactory({
        font: "body",
        fontSize: "secondary"
      });
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "Font factory xlarge scale",
    test: () => {
      const testInstance = styleguide({ scale: scales.xlarge }).fontFactory({
        font: "body",
        fontSize: "secondary"
      });
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "Animations should have a FadeIn animation wrapper component",
    test: () => {
      const testInstance = TestRenderer.create(
        <Animations.FadeIn>
          <Text>Hello World</Text>
        </Animations.FadeIn>
      );

      expect(testInstance.toJSON()).toMatchSnapshot();

      jest.runTimersToTime();

      expect(testInstance.toJSON()).toMatchSnapshot();
    }
  },
  // Non snapshot tests
  {
    name:
      "Font factory should throw a a TypeError if no font or font size are provided",
    test: () => {
      expect(() => styleguide().fontFactory()).toThrow(TypeError);
    }
  },
  {
    name:
      "Font factory should throw a TypeError if no font or font size are not correctly referenced",
    test: () => {
      expect(() =>
        styleguide().fontFactory({
          font: "comicSans",
          fontSize: "massive"
        })
      ).toThrow(TypeError);
    }
  },
  {
    name:
      "Line height factory should throw a a TypeError if no font or font size are provided",
    test: () => {
      expect(() => styleguide().lineHeight()).toThrow(TypeError);
    }
  },
  {
    name:
      "Line height factory should throw a TypeError if no font or font size are not correctly referenced",
    test: () => {
      expect(() =>
        styleguide().lineHeight({
          font: "comicSans",
          fontSize: "massive"
        })
      ).toThrow(TypeError);
    }
  }
];

export default () =>
  describe("", () => {
    beforeAll(() => jest.useFakeTimers());
    afterAll(() => jest.useRealTimers());

    iterator(tests);
  });
