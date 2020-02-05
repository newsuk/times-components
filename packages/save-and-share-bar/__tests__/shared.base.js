/* eslint-env browser */
import React from "react";
import TestRenderer from "react-test-renderer";
import { Clipboard } from "react-native";
import { UserState } from "./mocks";
import mockGetTokenisedArticleUrl from "./mock-get-tokenised-article-url";
import BarItem from "../src/bar-item";
import SaveAndShareBar from "../src/save-and-share-bar";
import EmailShare from "../src/email-share";

const mockEvent = {
  preventDefault: () => {}
};

export default () => {
  describe("save and share bar component", () => {
    const onCopyLink = jest.fn();
    const onShareEmail = jest.fn();
    const articleId = "96508c84-6611-11e9-adc2-05e1b87efaea";
    const articleUrl = "https://www.thetimes.co.uk/";
    const articleHeadline = "test-headline";
    const props = {
      articleId,
      articleUrl,
      articleHeadline,
      onCopyLink,
      onShareEmail,
      getTokenisedShareUrl: mockGetTokenisedArticleUrl,
      sharingEnabled: true,
      savingEnabled: true
    };

    let realLocation;

    beforeEach(() => {
      realLocation = global.window.location;
      delete global.window.location;
      global.window.location = {
        assign: jest.fn(),
        search: ""
      };
    });

    afterEach(() => {
      delete global.window.location;
      global.window.location = realLocation;
    });

    it("save and share bar renders correctly when logged in", () => {
      UserState.mockStates = [UserState.subscriber, UserState.loggedIn];
      const testInstance = TestRenderer.create(<SaveAndShareBar {...props} />);
      expect(testInstance.toJSON()).toMatchSnapshot();
    });

    it("save and share bar renders correctly when not logged in", () => {
      UserState.mockStates = [];
      const testInstance = TestRenderer.create(<SaveAndShareBar {...props} />);
      expect(testInstance.toJSON()).toMatchSnapshot();
    });

    it("onPress events triggers correctly", () => {
      const testInstance = TestRenderer.create(<SaveAndShareBar {...props} />);
      testInstance.root.findAllByType(BarItem)[3].props.onPress(mockEvent);
      expect(Clipboard.setString).toHaveBeenCalledWith(articleUrl);
      expect(onCopyLink).toHaveBeenCalled();
    });

    it("tokenises when logged in as a subscriber", () => {
      UserState.mockStates = [UserState.subscriber];
      const testInstance = TestRenderer.create(<SaveAndShareBar {...props} />);
      expect(
        testInstance.root.findByType(EmailShare).props.shouldTokenise
      ).toEqual(true);
    });

    it("does not tokenises when not logged in", () => {
      UserState.mockStates = [];
      const testInstance = TestRenderer.create(<SaveAndShareBar {...props} />);
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
      await testInstance.root.findByType(BarItem).props.onPress(mockEvent);

      expect(testInstance).toMatchSnapshot();
    });

    it("when tokenising, email icon fetches tokenised article url and change window.location (The Times)", async () => {
      const testInstance = TestRenderer.create(
        <EmailShare {...props} shouldTokenise publicationName="TIMES" />
      );

      const mock = await mockGetTokenisedArticleUrl(articleId);
      const url = mock.data.article.tokenisedUrl;

      const mailtoUrl = `mailto:?subject=${articleHeadline} from The Times&body=I thought you would be interested in this story from The Times%0A%0A${articleHeadline}%0A%0A${url}`;

      await testInstance.root
        .findAllByType(BarItem)[0]
        .props.onPress(mockEvent);
      expect(window.location.assign).toBeCalledWith(mailtoUrl);
    });

    it("when tokenising, email icon fetches tokenised article url and change window.location (The Sunday Times)", async () => {
      const testInstance = TestRenderer.create(
        <EmailShare
          {...props}
          shouldTokenise
          publicationName="THE SUNDAY TIMES"
        />
      );

      const mock = await mockGetTokenisedArticleUrl(articleId);
      const url = mock.data.article.tokenisedUrl;

      const mailtoUrl = `mailto:?subject=${articleHeadline} from The Sunday Times&body=I thought you would be interested in this story from The Sunday Times%0A%0A${articleHeadline}%0A%0A${url}`;

      await testInstance.root
        .findAllByType(BarItem)[0]
        .props.onPress(mockEvent);
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
        .findAllByType(BarItem)[0]
        .props.onPress(mockEvent);
      expect(window.location.assign).toBeCalledWith(mailtoUrl);
    });

    it("when not tokenising email icon uses article url and change window.location", async () => {
      const testInstance = TestRenderer.create(
        <EmailShare {...props} shouldTokenise={false} publicationName="TIMES" />
      );

      const mailtoUrl = `mailto:?subject=${articleHeadline} from The Times&body=I thought you would be interested in this story from The Times%0A%0A${articleHeadline}%0A%0A${articleUrl}`;

      await testInstance.root
        .findAllByType(BarItem)[0]
        .props.onPress(mockEvent);
      expect(window.location.assign).toBeCalledWith(mailtoUrl);
    });
  });
};
