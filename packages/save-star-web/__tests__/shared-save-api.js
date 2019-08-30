/* eslint-disable react/prop-types,react/no-unused-state */
import React, { Component } from "react";
import TestRenderer from "react-test-renderer";
import { delay } from "@times-components/test-utils";
import Link from "@times-components/link";
import SaveAPI from "../src/save-api";
import MockBookmarksProvider from "../mock-bookmarks-provider";

export default () => {
  const articleId = "abc-123";

  it("it calls children with bookmark information", async () => {
    const children = jest.fn(() => null);

    TestRenderer.create(
      <MockBookmarksProvider articleId={articleId}>
        <SaveAPI articleId={articleId}>{children}</SaveAPI>
      </MockBookmarksProvider>
    );

    await delay(0);

    expect(children).toHaveBeenCalledWith({
      savedStatus: false,
      isLoading: true,
      toggleSaved: expect.any(Function)
    });
  });

  it("updates loading state once bookmarks have loaded", async () => {
    const children = jest.fn(() => null);

    TestRenderer.create(
      <MockBookmarksProvider articleId={articleId}>
        <SaveAPI articleId={articleId}>{children}</SaveAPI>
      </MockBookmarksProvider>
    );

    await delay(0);

    // @todo How do I wait for the delays in the GraphQL mocks?

    expect(children).toHaveBeenCalledWith({
      savedStatus: false,
      isLoading: false,
      toggleSaved: expect.any(Function)
    });
  });
};
