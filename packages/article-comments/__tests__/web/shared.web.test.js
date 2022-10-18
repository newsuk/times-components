/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "jest-styled-components";

import { UserState } from "./mocks";

import ArticleComments from "../../src/article-comments";
import { ssoCallback } from "../../src/comment-login";

const renderComments = ({ enabled }) =>
  render(
    <ArticleComments
      articleId="dummy-article-id"
      commentsEnabled={enabled}
      isEnabled={enabled}
      onCommentGuidelinesPress={() => {}}
      onCommentsPress={() => {}}
      commentingConfig={{ account: "sp_pCQgrRiN" }}
      url="dummy-article-url"
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

describe("User States", () => {
  it("enabled comments", () => {
    const { asFragment, baseElement } = renderComments({
      count: 123,
      enabled: true
    });

    expect(baseElement.getElementsByTagName("script")[0].src).toEqual(
      "https://launcher.spot.im/spot/sp_pCQgrRiN"
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("RA Users", () => {
    UserState.mockStates = [UserState.showJoinTheConversationDialog];

    const { asFragment, getAllByText } = renderComments({
      count: 123,
      enabled: true
    });
    expect(getAllByText("Join the conversation").length).toEqual(1);
    expect(asFragment()).toMatchSnapshot();
  });

  it("No user state", () => {
    UserState.mockStates = [];

    const { asFragment } = renderComments({
      count: 123,
      enabled: true
    });
    expect(asFragment()).toMatchSnapshot();
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
      />
    );
    expect(Object.keys(listeners)).toMatchSnapshot();
  });
});
