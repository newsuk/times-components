/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "jest-styled-components";

import { UserState } from "./mocks";

import ArticleComments from "../../src/article-comments";

const renderComments = ({
  enabled,
  publishedTime = "2021-08-10T16:00:00.000Z"
}) =>
  render(
    <ArticleComments
      articleId="dummy-article-id"
      publishedTime={publishedTime}
      commentsEnabled={enabled}
      isEnabled={enabled}
      onCommentGuidelinesPress={() => {}}
      onCommentsPress={() => {}}
      commentingConfig={{
        account: {
          current: "CurrentSpotID",
          readOnly: "ReadOnlySpotID"
        },
        switchOver: "2020-08-10T16:00:00.000Z"
      }}
      url="dummy-article-url"
    />
  );

describe("User States", () => {
  it("enabled comments", () => {
    UserState.mockStates = [UserState.subscriber];

    const { asFragment, baseElement } = renderComments({
      count: 123,
      enabled: true
    });

    expect(baseElement.getElementsByTagName("script")[0].src).toEqual(
      "https://launcher.spot.im/spot/CurrentSpotID"
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("RA Users", () => {
    UserState.mockStates = [UserState.metered, UserState.loggedIn];

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

it("pre-switchover comments", () => {
  const { asFragment, baseElement } = renderComments({
    count: 123,
    enabled: true,
    publishedTime: "2019-08-10T16:00:00.000Z"
  });
  expect(baseElement.getElementsByTagName("script")[0].src).toEqual(
    "https://launcher.spot.im/spot/ReadOnlySpotID"
  );
  expect(baseElement.getElementsByClassName("info").length).toEqual(1);

  expect(asFragment()).toMatchSnapshot();
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
      commentingConfig={{
        account: {
          current: "CurrentSpotID",
          readOnly: "ReadOnlySpotID"
        },
        switchOver: "2020-08-10T16:00:00.000Z"
      }}
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
        commentingConfig={{
          account: {
            current: "CurrentSpotID",
            readOnly: "ReadOnlySpotID"
          },
          switchOver: "2020-08-10T16:00:00.000Z"
        }}
        url="dummy-article-url"
      />
    );
    expect(Object.keys(listeners)).toMatchSnapshot();
  });
});
