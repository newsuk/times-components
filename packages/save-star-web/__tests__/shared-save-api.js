import React from "react";
import TestRenderer from "react-test-renderer";
import { delay } from "@times-components/test-utils";
import { MockBookmarksProvider } from "@times-components/provider-test-tools";
import SaveAPI from "../src/save-api";

export default () => {
  const articleId = "abc-123";

  beforeAll(async () => {
    await MockBookmarksProvider.prepareCache({ articleId });
  });

  afterAll(() => {
    MockBookmarksProvider.destroyCache();
  });

  it("provides a function to toggle current saved state", () => {
    const children = jest.fn(() => null);

    TestRenderer.create(
      <MockBookmarksProvider articleId={articleId}>
        <SaveAPI articleId={articleId}>{children}</SaveAPI>
      </MockBookmarksProvider>
    );

    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        toggleSaved: expect.any(Function)
      })
    );
  });

  it("it calls children with loading true whilst mock requests are loading", () => {
    const children = jest.fn(() => null);

    TestRenderer.create(
      <MockBookmarksProvider articleId={articleId}>
        <SaveAPI articleId={articleId}>{children}</SaveAPI>
      </MockBookmarksProvider>
    );

    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isLoading: true
      })
    );
  });

  it("updates loading state once bookmarks have loaded", async () => {
    const children = jest.fn(() => null);

    TestRenderer.create(
      <MockBookmarksProvider articleId={articleId}>
        <SaveAPI articleId={articleId}>{children}</SaveAPI>
      </MockBookmarksProvider>
    );

    await delay(0);

    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isLoading: false,
        savedStatus: false
      })
    );
  });

  it("updates loading state when toggling saved state while currently unsaved", async () => {
    let toggleSaved;
    const children = jest.fn(mockData => {
      ({ toggleSaved } = mockData);
      return null;
    });

    TestRenderer.create(
      <MockBookmarksProvider articleId={articleId}>
        <SaveAPI articleId={articleId}>{children}</SaveAPI>
      </MockBookmarksProvider>
    );

    await delay(0);

    const promise = toggleSaved();

    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        savedStatus: false,
        isLoading: true
      })
    );

    await promise;
  });

  it("updates saved state when toggling saved state while currently unsaved finishes loading", async () => {
    let toggleSaved;
    const children = jest.fn(mockData => {
      ({ toggleSaved } = mockData);
      return null;
    });

    TestRenderer.create(
      <MockBookmarksProvider articleId={articleId}>
        <SaveAPI articleId={articleId}>{children}</SaveAPI>
      </MockBookmarksProvider>
    );

    await delay(0);
    await toggleSaved();

    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        savedStatus: true,
        isLoading: false
      })
    );
  });

  it("updates loading state when toggling saved state while currently saved", async () => {
    let toggleSaved;
    const children = jest.fn(mockData => {
      ({ toggleSaved } = mockData);
      return null;
    });

    TestRenderer.create(
      <MockBookmarksProvider articleId={articleId}>
        <SaveAPI articleId={articleId}>{children}</SaveAPI>
      </MockBookmarksProvider>
    );

    await delay(0);
    await toggleSaved();

    const promise = toggleSaved();

    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        savedStatus: true,
        isLoading: true
      })
    );

    await promise;
  });

  it("updates saved state when toggling saved state while currently saved finishes loading", async () => {
    let toggleSaved;
    const children = jest.fn(mockData => {
      ({ toggleSaved } = mockData);
      return null;
    });

    TestRenderer.create(
      <MockBookmarksProvider articleId={articleId}>
        <SaveAPI articleId={articleId}>{children}</SaveAPI>
      </MockBookmarksProvider>
    );

    await delay(0);
    await toggleSaved();
    await toggleSaved();

    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        savedStatus: false,
        isLoading: false
      })
    );
  });
};
