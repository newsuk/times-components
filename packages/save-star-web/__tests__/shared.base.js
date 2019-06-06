import React from "react";
import TestRenderer from "react-test-renderer";
import { delay } from "@times-components/test-utils";
import Link from "@times-components/link";
import SaveStarWeb from "../src/save-star-web";
import mockSaveApi from "../mock-save-api";

export default () => {
  describe("save star component", () => {
    const mockFunc = jest.fn();
    const savedId = "5504b5a8-b1c0-11e8-a553-a0ee9be48bc6";
    const notSavedId = "6604b5a8-b1c0-11e8-a553-a0ee9be48bc6";

    it("star with saved status renders correctly", async () => {
      const testInstance = TestRenderer.create(
        <SaveStarWeb
          articleId={savedId}
          saveApi={mockSaveApi}
          onSaveButtonPress={mockFunc}
        />
      );
      await delay(0);
      expect(testInstance).toMatchSnapshot();
    });

    it("star with unsaved status renders correctly", async () => {
      const testInstance = TestRenderer.create(
        <SaveStarWeb
          articleId={notSavedId}
          saveApi={mockSaveApi}
          onSaveButtonPress={mockFunc}
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
          articleId={notSavedId}
          saveApi={apiMock}
          onSaveButtonPress={mockFunc}
        />
      );

      await delay(0);
      expect(testInstance).toMatchSnapshot();
    });

    it("check if unBookmark api method is invoked", async () => {
      const unBookmark = jest.fn().mockResolvedValue();
      const testInstance = TestRenderer.create(
        <SaveStarWeb
          articleId={savedId}
          saveApi={{
            ...mockSaveApi,
            unBookmark
          }}
          onSaveButtonPress={jest.fn(cb => cb())}
        />
      );

      const [saveStarLink] = testInstance.root.findAllByType(Link);
      await delay(0);
      await saveStarLink.props.onPress();

      expect(unBookmark).toHaveBeenCalled();
    });

    it("check if bookmark api method is invoked", async () => {
      const bookmark = jest.fn().mockResolvedValue();
      const testInstance = TestRenderer.create(
        <SaveStarWeb
          articleId={notSavedId}
          saveApi={{
            ...mockSaveApi,
            bookmark
          }}
          onSaveButtonPress={jest.fn(cb => cb())}
        />
      );

      const [saveStarLink] = testInstance.root.findAllByType(Link);
      await delay(0);
      await saveStarLink.props.onPress();

      expect(bookmark).toHaveBeenCalled();
    });
  });
};
