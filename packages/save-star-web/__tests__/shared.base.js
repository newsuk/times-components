import React from "react";
import TestRenderer from "react-test-renderer";
import { delay } from "@times-components/test-utils";
import SaveStarWeb from "../src/save-star-web";
import mockSaveApi from "../mock-save-api";

export default () => {
  describe("save star component", () => {
    it("star with saved status renders correctly", async () => {
      const testInstance = TestRenderer.create(
        <SaveStarWeb
          articleId="5504b5a8-b1c0-11e8-a553-a0ee9be48bc6"
          saveApi={mockSaveApi}
        />
      );
      await delay(0);
      expect(testInstance).toMatchSnapshot();
    });

    it("star with unsaved status renders correctly", async () => {
      const testInstance = TestRenderer.create(
        <SaveStarWeb
          articleId="6604b5a8-b1c0-11e8-a553-a0ee9be48bc6"
          saveApi={mockSaveApi}
        />
      );
      await delay(0);
      expect(testInstance).toMatchSnapshot();
    });

    it("save star loading state", async () => {
      const apiMock = {
        ...mockSaveApi,
        getBookmarks: () =>
          Promise.resolve({
            loading: true
          })
      };

      const testInstance = TestRenderer.create(
        <SaveStarWeb
          articleId="6604b5a8-b1c0-11e8-a553-a0ee9be48bc6"
          saveApi={apiMock}
        />
      );

      await delay(0);
      expect(testInstance).toMatchSnapshot();
    });
  });
};
