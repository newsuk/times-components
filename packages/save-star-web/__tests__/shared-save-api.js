/* eslint-disable react/prop-types,react/no-unused-state */
import React from "react";
import TestRenderer from "react-test-renderer";
import { delay } from "@times-components/test-utils";
import SaveAPI from "../src/save-api";
import MockBookmarksProvider from "./mock-bookmarks-provider";

async function waitForMocks(renderer) {
  await renderer.getInstance().setMocks();
}

export default () => {
  const articleId = "abc-123";

  it("provides a function to toggle current saved state", async () => {
    const children = jest.fn(() => null);

    await waitForMocks(
      TestRenderer.create(
        <MockBookmarksProvider articleId={articleId}>
          <SaveAPI articleId={articleId}>{children}</SaveAPI>
        </MockBookmarksProvider>
      )
    );

    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        toggleSaved: expect.any(Function)
      })
    );
  });

  it("it calls children with loading true whilst mock requests are loading", async () => {
    const children = jest.fn(() => null);

    await waitForMocks(
      TestRenderer.create(
        <MockBookmarksProvider articleId={articleId}>
          <SaveAPI articleId={articleId}>{children}</SaveAPI>
        </MockBookmarksProvider>
      )
    );

    expect(children).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isLoading: true
      })
    );
  });

  it("updates loading state once bookmarks have loaded", async () => {
    const children = jest.fn(() => null);

    await waitForMocks(
      TestRenderer.create(
        <MockBookmarksProvider articleId={articleId}>
          <SaveAPI articleId={articleId}>{children}</SaveAPI>
        </MockBookmarksProvider>
      )
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

    await waitForMocks(
      TestRenderer.create(
        <MockBookmarksProvider articleId={articleId}>
          <SaveAPI articleId={articleId}>{children}</SaveAPI>
        </MockBookmarksProvider>
      )
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

    await waitForMocks(
      TestRenderer.create(
        <MockBookmarksProvider articleId={articleId}>
          <SaveAPI articleId={articleId}>{children}</SaveAPI>
        </MockBookmarksProvider>
      )
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

    await waitForMocks(
      TestRenderer.create(
        <MockBookmarksProvider articleId={articleId}>
          <SaveAPI articleId={articleId}>{children}</SaveAPI>
        </MockBookmarksProvider>
      )
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

    await waitForMocks(
      TestRenderer.create(
        <MockBookmarksProvider articleId={articleId}>
          <SaveAPI articleId={articleId}>{children}</SaveAPI>
        </MockBookmarksProvider>
      )
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
