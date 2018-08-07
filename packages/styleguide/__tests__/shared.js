import { Text } from "react-native";
import React from "react";
import TestRenderer from "react-test-renderer";
import timesStyleguide, { Animations } from "../src/styleguide";

export default () => {
  describe("Animations", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it("should have a FadeIn animation wrapper component", () => {
      const testInstance = TestRenderer.create(
        <Animations.FadeIn>
          <Text>Hello World</Text>
        </Animations.FadeIn>
      );

      expect(testInstance.toJSON()).toMatchSnapshot();

      jest.runTimersToTime();

      expect(testInstance.toJSON()).toMatchSnapshot();
    });
  });

  describe("Styleguide Factory", () => {
    describe("Font factory", () => {
      it("should provide a font family, font size and line height that is default scaled for a correct reference", () => {
        const testInstance = timesStyleguide().fontFactory({
          font: "body",
          fontSize: "secondary"
        });
        expect(testInstance).toMatchSnapshot();
      });

      it('should provide a font family, font size and line height that is "large" scaled for a correct reference', () => {
        const testInstance = timesStyleguide({ scale: "large" }).fontFactory({
          font: "body",
          fontSize: "secondary"
        });
        expect(testInstance).toMatchSnapshot();
      });

      it('should provider a font family, font size and line height that is "xlarge" scaled for a correct reference', () => {
        const testInstance = timesStyleguide({ scale: "xlarge" }).fontFactory({
          font: "body",
          fontSize: "secondary"
        });
        expect(testInstance).toMatchSnapshot();
      });

      it("should throw a a TypeError if no font or font size are provided", () => {
        expect(() => timesStyleguide().fontFactory()).toThrow(TypeError);
      });

      it("should throw a TypeError if no font or font size are not correctly referenced", () => {
        expect(() =>
          timesStyleguide().fontFactory({
            font: "comicSans",
            fontSize: "massive"
          })
        ).toThrow(TypeError);
      });
    });

    describe("Font sizes", () => {
      it("should give a correct font size for a correct reference scaled to default", () => {
        const testInstance = timesStyleguide().fontSizes.bodyMobile;
        expect(testInstance).toMatchSnapshot();
      });

      it('should give a correct font size for a correct reference scaled to "large"', () => {
        const testInstance = timesStyleguide({ scale: "large" }).fontSizes
          .bodyMobile;
        expect(testInstance).toMatchSnapshot();
      });

      it('should give a correct font size for a correct reference scaled to "xlarge"', () => {
        const testInstance = timesStyleguide().fontSizes.bodyMobile;
        expect(testInstance).toMatchSnapshot();
      });
    });

    describe("Line height factory", () => {
      it("should give a correct line height for a correct reference scaled to default", () => {
        const testInstance = timesStyleguide({ scale: "xlarge" }).lineHeight({
          font: "body",
          fontSize: "secondary"
        });
        expect(testInstance).toMatchSnapshot();
      });

      it('should give a correct line height for a correct reference scaled to "large"', () => {
        const testInstance = timesStyleguide({ scale: "large" }).lineHeight({
          font: "body",
          fontSize: "secondary"
        });
        expect(testInstance).toMatchSnapshot();
      });

      it('should give a correct line height for a correct reference scaled to "xlarge"', () => {
        const testInstance = timesStyleguide({ scale: "xlarge" }).lineHeight({
          font: "body",
          fontSize: "secondary"
        });
        expect(testInstance).toMatchSnapshot();
      });

      it("should throw a a TypeError if no font or font size are provided", () => {
        expect(() => timesStyleguide().lineHeight()).toThrow(TypeError);
      });

      it("should throw a TypeError if no font or font size are not correctly referenced", () => {
        expect(() =>
          timesStyleguide().lineHeight({
            font: "comicSans",
            fontSize: "massive"
          })
        ).toThrow(TypeError);
      });
    });
  });
};
