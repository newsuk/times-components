import { scales } from "@times-components/context";
import { iterator } from "@times-components/test-utils";
import shared from "../shared";
import styleguide, { colours, fonts, spacing } from "../../src/styleguide";

const tests = [
  {
    name: "Font sizes at default scale",
    test: () => {
      const testInstance = styleguide().fontSizes.bodyMobile;
      expect(testInstance).toEqual(17);
    }
  },
  {
    name: 'Font sizes at large scale"',
    test: () => {
      const testInstance = styleguide({ scale: scales.large }).fontSizes
        .bodyMobile;
      expect(testInstance).toEqual(17);
    }
  },
  {
    name: "Font sizes at xlarge scale",
    test: () => {
      const testInstance = styleguide({ scale: scales.xlarge }).fontSizes
        .bodyMobile;
      expect(testInstance).toEqual(17);
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
      expect(testInstance).toEqual(27);
    }
  },
  {
    name: "Line height factory at xlarge scale",
    test: () => {
      const testInstance = styleguide({ scale: scales.xlarge }).lineHeight({
        font: "body",
        fontSize: "secondary"
      });
      expect(testInstance).toEqual(27);
    }
  },
  {
    name: "Object of section colours",
    test: () => {
      expect(typeof colours.section).toBe("object");
    }
  },
  {
    name: "Object of functional colours",
    test: () => {
      expect(typeof colours.functional).toBe("object");
    }
  },
  {
    name: "Object of font references",
    test: () => {
      expect(typeof fonts).toBe("object");
    }
  },
  {
    name: "Multiply spacing values and add px property",
    test: () => {
      expect(spacing(10)).toBe("50px");
    }
  }
];

shared();
iterator(tests);
