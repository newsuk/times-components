/**
 * @jest-environment node
 */
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

import "../mocks.web";

import { PROGRESS_ATTR_NAME } from "@times-components/sticky";
import StickySaveAndShareBar from "../../src/sticky-save-and-share-bar";

jest.mock("@times-components/save-and-share-bar", () => () =>
  "SaveAndShareBar"
);

describe("StickySaveAndShareBar ssr", () => {
  it("does not include transition styles when server side rendering", () => {
    const sheet = new ServerStyleSheet();
    renderToString(sheet.collectStyles(<StickySaveAndShareBar />));
    const styleTags = sheet.getStyleTags();

    expect(styleTags).not.toContain(PROGRESS_ATTR_NAME);
  });
});
