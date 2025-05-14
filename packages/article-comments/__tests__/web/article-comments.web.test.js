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
  getBase64CookieValue: jest.fn()
}));

jest.mock("../../src/comments", () => () => <>Comments</>);
jest.mock("../../src/disabled-comments", () => () => <>DisabledComments</>);
jest.mock("../../src/join-the-conversation-dialog", () => () => (
  <>JoinTheConversationDialog</>
));

describe("<ArticleComments>", () => {
  it("should show <DisabledComments> when isEnabled=false", () => {
    const { getByText } = render(<ArticleComments />);
    expect(getByText("DisabledComments"));
  });

  it("should show <JoinTheConversationDialog> when isEnabled=true and no cookie", () => {
    const { getByText } = render(<ArticleComments isEnabled />);
    expect(getByText("JoinTheConversationDialog"));
  });

  it("should show <JoinTheConversationDialog> when isEnabled=true and no entitlement", () => {
    getBase64CookieValue.mockReturnValue({ "fp-1113": false });

    const { getByText } = render(<ArticleComments isEnabled />);
    expect(getByText("JoinTheConversationDialog"));
  });

  it("should show <Comments> when isEnabled=true", () => {
    getBase64CookieValue.mockReturnValue({ "fp-1113": true });

    const { getByText } = render(<ArticleComments isEnabled />);
    expect(getByText("Comments"));
  });
});
