/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "jest-styled-components";

import ArticleComments from "../../src/article-comments";
import { ssoCallback } from "../../src/comment-login";

const renderComments = ({
  enabled,
  domainSpecificUrl = "https://www.thetimes.co.uk"
}) =>
  render(
    <ArticleComments
      articleId="dummy-article-id"
      commentsEnabled={enabled}
      isEnabled={enabled}
      onCommentGuidelinesPress={() => {}}
      onCommentsPress={() => {}}
      commentingConfig={{ account: "sp_pCQgrRiN" }}
      storefrontConfig="https://www.mockUrl.co.uk"
      url="dummy-article-url"
      isCommentEnabled
      domainSpecificUrl={domainSpecificUrl}
    />
  );

describe("comments-login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const xhrMock = {
    open: jest.fn(),
    send: jest.fn(),
    addEventListener: jest.fn()
  };

  it("uses new commenting service", () => {
    global.window = Object.create(window);

    jest.spyOn(window, "XMLHttpRequest").mockImplementation(() => xhrMock);

    ssoCallback("mock-code-a", {});

    expect(xhrMock.open).toHaveBeenCalledWith(
      "GET",
      "/api/comments/loginv2?codeA=mock-code-a"
    );
  });
});

it("disabled comments", () => {
  const { asFragment, baseElement } = renderComments({
    count: 123,
    enabled: false
  });
  expect(baseElement.getElementsByClassName("info").length).toEqual(0);
  expect(asFragment()).toMatchSnapshot();
});

it("zero comments", () => {
  const { asFragment } = renderComments({ count: 0, enabled: true });
  expect(asFragment()).toMatchSnapshot();
});

it("single comment", () => {
  const { asFragment } = renderComments({ count: 1, enabled: true });
  expect(asFragment()).toMatchSnapshot();
});

it("Render comments label, when comments are loaded", () => {
  // eslint-disable-next-line no-undef
  window.SPOTIM = {
    startSSO: () => {}
  };

  const { asFragment } = render(
    <ArticleComments
      articleId="dummy-article-id"
      commentsEnabled
      isEnabled
      onCommentGuidelinesPress={() => {}}
      onCommentsPress={() => {}}
      commentingConfig={{ account: "sp_pCQgrRiN" }}
      url="dummy-article-url"
      isCommentEnabled
      domainSpecificUrl="https://www.thetimes.co.uk"
    />
  );

  expect(asFragment()).toMatchSnapshot();
});

describe("window listeners added", () => {
  const realAddEventListener = window.document.addEventListener;
  let listeners = {};

  beforeEach(() => {
    window.document.addEventListener = jest.fn((event, cb) => {
      listeners[event] = cb;
    });
  });
  afterEach(() => {
    window.document.addEventListener = realAddEventListener;
    listeners = {};
  });

  it("all listeners added", () => {
    render(
      <ArticleComments
        articleId="dummy-article-id"
        commentsEnabled
        isEnabled
        onCommentGuidelinesPress={() => {}}
        onCommentsPress={() => {}}
        commentingConfig={{ account: "sp_pCQgrRiN" }}
        url="dummy-article-url"
        isCommentEnabled
        domainSpecificUrl="https://www.thetimes.co.uk"
      />
    );
    expect(Object.keys(listeners)).toMatchSnapshot();
  });
});
