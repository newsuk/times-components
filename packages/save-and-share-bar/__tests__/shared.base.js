/* eslint-env browser */
import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { checkForSymphonyExperiment } from "@times-components/utils";
import { UserState } from "./mocks";
import mockGetTokenisedArticleUrl from "./mock-get-tokenised-article-url";
import { ShareItem } from "../src/components/share-item";
import SaveAndShareBar from "../src/save-and-share-bar";
import EmailShare from "../src/components/email-share";
import { OutlineButton, ShareButtonHighlightContainer } from "../src/styled";
import MockedProvider from "../../provider-test-tools/src/mocked-provider";

const mockEvent = {
  preventDefault: () => {}
};

jest.mock("@times-components/utils", () => ({
  __esModule: true,
  ...jest.requireActual("@times-components/utils"),
  checkForSymphonyExperiment: jest.fn()
}));

export default () => {
  describe("save and share bar component", () => {
    const onCopyLink = jest.fn();
    const onShareEmail = jest.fn();
    const articleId = "96508c84-6611-11e9-adc2-05e1b87efaea";
    const hostName = "https://www.thetimes.co.uk";
    const articleUrl = "https://www.thetimes.co.uk/";
    const articleHeadline = "test-headline";
    const originalClipboard = { ...global.navigator.clipboard };
    const props = {
      articleId,
      articleUrl,
      articleHeadline,
      onCopyLink,
      onShareEmail,
      getTokenisedShareUrl: mockGetTokenisedArticleUrl,
      sharingEnabled: true,
      savingEnabled: true,
      hostName
    };
    let realLocation;
    let clipboardData;
    let mockClipboard;
    beforeEach(() => {
      realLocation = global.window.location;
      delete global.window.location;
      global.window.location = {
        assign: jest.fn(),
        search: ""
      };
      clipboardData = "";
      mockClipboard = {
        writeText: jest.fn(data => {
          clipboardData = data;
        }),
        readText: jest.fn(() => clipboardData)
      };
      global.navigator.clipboard = mockClipboard;
    });
    afterEach(() => {
      delete global.window.location;
      global.window.location = realLocation;
      global.navigator.clipboard = originalClipboard;
    });
    it("save and share bar renders correctly when logged in", () => {
      const testInstance = TestRenderer.create(
        <MockedProvider>
          <SaveAndShareBar {...props} />
        </MockedProvider>
      );
      expect(testInstance.toJSON()).toMatchSnapshot();
    });
    it("save and share bar renders correctly when not logged in", () => {
      UserState.mockStates = [];
      const testInstance = TestRenderer.create(
        <MockedProvider>
          <SaveAndShareBar {...props} />
        </MockedProvider>
      );
      expect(testInstance.toJSON()).toMatchSnapshot();
    });
    it("renders the Share button highlight when Project Symphony is on, Share button has not been clicked on this page and Share button highlight has not been previously seen on other articles", () => {
      UserState.mockStates = [UserState.showSaveAndShareBar];
      checkForSymphonyExperiment.mockReturnValue(true);
      const testInstance = TestRenderer.create(
        <MockedProvider>
          <SaveAndShareBar {...props} />
        </MockedProvider>
      );
      expect(
        testInstance.root.findAllByType(ShareButtonHighlightContainer)
      ).toBeDefined();
    });
    it("does not render the Share button highlight when Project Symphony is on and Share button has been clicked", () => {
      UserState.mockStates = [UserState.showSaveAndShareBar];
      checkForSymphonyExperiment.mockReturnValue(true);
      const testInstance = TestRenderer.create(
        <MockedProvider>
          <SaveAndShareBar {...props} />
        </MockedProvider>
      );
      act(() => {
        testInstance.root
          .findAllByType(OutlineButton)[0]
          .props.onClick(mockEvent);
      });
      const shareButtonHighlightContainers = testInstance.root.findAllByType(
        ShareButtonHighlightContainer
      );
      expect(shareButtonHighlightContainers.length).toBe(0);
    });
    it("does not render the Share button highlight when Project Symphony is not on", () => {
      UserState.mockStates = [UserState.showSaveAndShareBar];
      checkForSymphonyExperiment.mockReturnValue(false);
      const testInstance = TestRenderer.create(
        <MockedProvider>
          <SaveAndShareBar {...props} />
        </MockedProvider>
      );
      const shareButtonHighlightContainers = testInstance.root.findAllByType(
        ShareButtonHighlightContainer
      );
      expect(shareButtonHighlightContainers.length).toBe(0);
    });
    it("onPress events triggers correctly", () => {
      const testInstance = TestRenderer.create(
        <MockedProvider>
          <SaveAndShareBar {...props} />
        </MockedProvider>
      );
      act(() => {
        testInstance.root
          .findAllByType(OutlineButton)[0]
          .props.onClick(mockEvent);
      });
      testInstance.root.findAllByType(ShareItem)[3].props.onClick(mockEvent);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(articleUrl);
      expect(onCopyLink).toHaveBeenCalled();
    });
    it("tokenises when logged in as a subscriber", () => {
      UserState.mockStates = [
        UserState.showSaveAndShareBar,
        UserState.showTokenisedEmailShare
      ];
      const testInstance = TestRenderer.create(<SaveAndShareBar {...props} />);
      act(() => {
        testInstance.root
          .findAllByType(OutlineButton)[0]
          .props.onClick(mockEvent);
      });
      expect(
        testInstance.root.findByType(EmailShare).props.shouldTokenise
      ).toEqual(true);
    });
    it("does not tokenises when not logged in", () => {
      UserState.mockStates = [];
      const testInstance = TestRenderer.create(<SaveAndShareBar {...props} />);
      act(() => {
        testInstance.root
          .findAllByType(OutlineButton)[0]
          .props.onClick(mockEvent);
      });
      expect(
        testInstance.root.findByType(EmailShare).props.shouldTokenise
      ).toEqual(false);
    });
    it("email icon when tokenising with loading state while network request is fetching data", async () => {
      const apiMock = () =>
        Promise.resolve({
          loading: true
        });
      const testInstance = TestRenderer.create(
        <EmailShare
          {...props}
          getTokenisedShareUrl={apiMock}
          shouldTokenise
          publicationName="TIMES"
        />
      );
      await testInstance.root.findByType(ShareItem).props.onClick(mockEvent);
      expect(testInstance).toMatchSnapshot();
    });
    it("when tokenising, email icon fetches tokenised article url and change window.location (The Times) with .co.uk", async () => {
      const mock = await mockGetTokenisedArticleUrl(articleId);
      const url = mock.data.article.tokenisedUrl;
      const testInstance = TestRenderer.create(
        <EmailShare {...props} shouldTokenise publicationName="TIMES" />
      );
      const mailtoUrl = `mailto:?subject=${articleHeadline} from The Times&body=I thought you would be interested in this story from The Times%0A%0A${articleHeadline}%0A%0A${url}`;
      await testInstance.root
        .findAllByType(ShareItem)[0]
        .props.onClick(mockEvent);
      expect(window.location.assign).toBeCalledWith(mailtoUrl);
    });
    it("when tokenising, email icon fetches tokenised article url and change window.location (The Times)", async () => {
      const mock = await mockGetTokenisedArticleUrl(articleId);
      const url = mock.data.article.tokenisedUrl.replace("co.uk", "com");
      const testInstance = TestRenderer.create(
        <EmailShare
          {...props}
          shouldTokenise
          publicationName="TIMES"
          hostName="https://www.thetimes.com"
        />
      );
      const mailtoUrl = `mailto:?subject=${articleHeadline} from The Times&body=I thought you would be interested in this story from The Times%0A%0A${articleHeadline}%0A%0A${url}`;
      await testInstance.root
        .findAllByType(ShareItem)[0]
        .props.onClick(mockEvent);
      expect(window.location.assign).toBeCalledWith(mailtoUrl);
    });
    it("when tokenising, email icon fetches tokenised article url and change window.location (The Sunday Times)", async () => {
      const mock = await mockGetTokenisedArticleUrl(articleId);
      const url = mock.data.article.tokenisedUrl;
      const testInstance = TestRenderer.create(
        <EmailShare
          {...props}
          shouldTokenise
          publicationName="THE SUNDAY TIMES"
        />
      );
      const mailtoUrl = `mailto:?subject=${articleHeadline} from The Sunday Times&body=I thought you would be interested in this story from The Sunday Times%0A%0A${articleHeadline}%0A%0A${url}`;
      await testInstance.root
        .findAllByType(ShareItem)[0]
        .props.onClick(mockEvent);
      expect(window.location.assign).toBeCalledWith(mailtoUrl);
    });
    it("when not tokenising, but using existing tokenised article, email icon uses existing tokenised article url and change window.location", async () => {
      window.location.search = "?shareToken=foo";
      const testInstance = TestRenderer.create(
        <EmailShare {...props} shouldTokenise={false} publicationName="TIMES" />
      );
      const url = `${articleUrl}?shareToken=foo`;
      const mailtoUrl = `mailto:?subject=${articleHeadline} from The Times&body=I thought you would be interested in this story from The Times%0A%0A${articleHeadline}%0A%0A${url}`;
      await testInstance.root
        .findAllByType(ShareItem)[0]
        .props.onClick(mockEvent);
      expect(window.location.assign).toBeCalledWith(mailtoUrl);
    });
    it("when not tokenising email icon uses article url and change window.location", async () => {
      const testInstance = TestRenderer.create(
        <EmailShare {...props} shouldTokenise={false} publicationName="TIMES" />
      );
      const mailtoUrl = `mailto:?subject=${articleHeadline} from The Times&body=I thought you would be interested in this story from The Times%0A%0A${articleHeadline}%0A%0A${articleUrl}`;
      await testInstance.root
        .findAllByType(ShareItem)[0]
        .props.onClick(mockEvent);
      expect(window.location.assign).toBeCalledWith(mailtoUrl);
    });
  });
};
