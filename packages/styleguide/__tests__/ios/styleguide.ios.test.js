import { iterator } from "@times-components/test-utils";
import styleguide, { scales } from "../../src/styleguide";
import shared from "../shared";
import sharedNative from "../shared-native";

const tests = [
  {
    name: "Font sizes at default scale",
    test: () => {
      const testInstance = styleguide().fontSizes.bodyMobile;
      expect(testInstance).toEqual(18);
    }
  },
  {
    name: 'Font sizes at large scale"',
    test: () => {
      const testInstance = styleguide({ scale: scales.large }).fontSizes
        .bodyMobile;
      expect(testInstance).toEqual(21);
    }
  },
  {
    name: "Font sizes at xlarge scale",
    test: () => {
      const testInstance = styleguide({ scale: scales.xlarge }).fontSizes
        .bodyMobile;
      expect(testInstance).toEqual(23);
    }
  },
  {
    name: "Line height factory default scale",
    test: () => {
      const testInstance = styleguide().lineHeight({
        font: "body",
        fontSize: "secondary"
      });
      expect(testInstance).toEqual(27);
    }
  },
  {
    name: "Line height factory at large scale",
    test: () => {
      const testInstance = styleguide({ scale: scales.large }).lineHeight({
        font: "body",
        fontSize: "secondary"
      });
      expect(testInstance).toEqual(30);
    }
  },
  {
    name: "Line height factory at xlarge scale",
    test: () => {
      const testInstance = styleguide({ scale: scales.xlarge }).lineHeight({
        font: "body",
        fontSize: "secondary"
      });
      expect(testInstance).toEqual(33);
    }
  }
];

shared();
sharedNative();
iterator(tests);
