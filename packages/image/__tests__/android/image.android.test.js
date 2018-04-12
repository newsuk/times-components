/* global context */
import React from "react";
import { shallow } from "enzyme";
import shared from "../shared";
import sharedNative from "../shared-native";
import Image from "../../src";

describe("Image tests on android", () => {
  shared();
  sharedNative();

  context("Image", () => {
    it("should handle handlePreviewLoad event", () => {
      const image = shallow(
        <Image aspectRatio={3 / 2} uri="//example.com/image.jpg" />
      );
      expect(image.state("isLoaded")).toEqual(false);
      image.instance().handlePreviewLoad();
      expect(image.state("isLoaded")).toEqual(true);
    });
  });
});
