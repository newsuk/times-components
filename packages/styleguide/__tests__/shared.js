import { Text } from "react-native";
import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import { scales } from "@times-components/context";
import styleguide, { Animations } from "../src/styleguide";

const tests = [
  {
    name:
      "Font factory should provide a font family, font size and line height that is default scaled for a correct reference",
    test: () => {
      const testInstance = styleguide().fontFactory({
        font: "body",
        fontSize: "secondary"
      });
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name:
      'Font factory should provide a font family, font size and line height that is "large" scaled for a correct reference',
    test: () => {
      const testInstance = styleguide({ scale: scales.large }).fontFactory({
        font: "body",
        fontSize: "secondary"
      });
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name:
      'Font factory should provider a font family, font size and line height that is "xlarge" scaled for a correct reference',
    test: () => {
      const testInstance = styleguide({ scale: scales.xlarge }).fontFactory({
        font: "body",
        fontSize: "secondary"
      });
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name:
      "Font sizes should give a correct font size for a correct reference scaled to default",
    test: () => {
      const testInstance = styleguide().fontSizes.bodyMobile;
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name:
      'Font sizes should give a correct font size for a correct reference scaled to "large"',
    test: () => {
      const testInstance = styleguide({ scale: scales.large }).fontSizes
        .bodyMobile;
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name:
      'Font sizes should give a correct font size for a correct reference scaled to "xlarge"',
    test: () => {
      const testInstance = styleguide().fontSizes.bodyMobile;
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name:
      "Line height factory should give a correct line height for a correct reference scaled to default",
    test: () => {
      const testInstance = styleguide({ scale: scales.xlarge }).lineHeight({
        font: "body",
        fontSize: "secondary"
      });
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name:
      'Line height factory should give a correct line height for a correct reference scaled to "large"',
    test: () => {
      const testInstance = styleguide({ scale: scales.large }).lineHeight({
        font: "body",
        fontSize: "secondary"
      });
      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name:
      'Line height factory should give a correct line height for a correct reference scaled to "xlarge"',
    test: () => {
      const testInstance = styleguide({ scale: scales.xlarge }).lineHeight({
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
