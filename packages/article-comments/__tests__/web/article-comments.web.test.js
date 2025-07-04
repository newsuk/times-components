/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "jest-styled-components";

import { getBase64CookieValue } from "@times-components/utils";

import ArticleComments from "../../src/article-comments";

jest.mock("@times-components/utils", () => ({
  __esModule: true,
  ...jest.requireActual("@times-components/utils"),
  getBase64CookieValue: jest.fn(),
  hasEntitlement: jest
    .fn()
    .mockImplementation(decisions => decisions && decisions["fp-1113"] === true)
}));

jest.mock("../../src/comments", () => () => <>Comments</>);
jest.mock("../../src/disabled-comments", () => () => <>DisabledComments</>);
jest.mock("../../src/join-the-conversation-dialog", () => () => (
  <>JoinTheConversationDialog</>
));

const mockProps = {
  articleId: "test-article-id",
  isEnabled: true,
  commentingConfig: { account: "test-account" },
  domainSpecificUrl: "https://test.com",
  isNewCommentingBannerEnabled: false
};

describe("<ArticleComments>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getBase64CookieValue.mockReturnValue(null);
  });

  it("should show <DisabledComments> when isEnabled=false", () => {
    const { getByText } = render(
      <ArticleComments {...mockProps} isEnabled={false} />
    );
    expect(getByText("DisabledComments")).toBeInTheDocument();
  });

  it("should show <JoinTheConversationDialog> when isEnabled=true and no cookie", () => {
    getBase64CookieValue.mockReturnValue(null);

    const { getByText } = render(<ArticleComments {...mockProps} />);
    expect(getByText("JoinTheConversationDialog")).toBeInTheDocument();
  });

  it("should show <JoinTheConversationDialog> when isEnabled=true and no entitlement", () => {
    getBase64CookieValue.mockReturnValue({ "fp-1113": false });

    const { getByText } = render(<ArticleComments {...mockProps} />);
    expect(getByText("JoinTheConversationDialog")).toBeInTheDocument();
  });

  it("should show <Comments> when isEnabled=true and has entitlement", () => {
    getBase64CookieValue.mockReturnValue({ "fp-1113": true });

    const { getByText } = render(<ArticleComments {...mockProps} />);
    expect(getByText("Comments")).toBeInTheDocument();
  });
});

describe("<ArticleComments> new commenting banner enabled", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getBase64CookieValue.mockReturnValue(null);
  });

  it("should show Zephr commenting banner when isEnabled=true and no cookie", () => {
    const { container } = render(
      <ArticleComments {...mockProps} isNewCommentingBannerEnabled />
    );
    expect(
      container.querySelector('[data-testid="zephr__commenting-banner"]')
    ).toBeInTheDocument();
  });

  it("should show Zephr commenting banner when isEnabled=true and no entitlement", () => {
    getBase64CookieValue.mockReturnValue({ "fp-1113": false });

    const { container } = render(
      <ArticleComments {...mockProps} isNewCommentingBannerEnabled />
    );
    expect(
      container.querySelector('[data-testid="zephr__commenting-banner"]')
    ).toBeInTheDocument();
  });

  it("should show <Comments> when isEnabled=true and has entitlement", () => {
    getBase64CookieValue.mockReturnValue({ "fp-1113": true });

    const { getByText } = render(
      <ArticleComments {...mockProps} isNewCommentingBannerEnabled />
    );
    expect(getByText("Comments")).toBeInTheDocument();
  });
});
