/* global context */
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { fixtureGenerator } from "@times-components/provider-test-tools";
import { delay, MockedProvider } from "@times-components/utils";
import AuthorProfile from "../src/author-profile";
import AuthorProfileHead from "../src/author-profile-head"; // eslint-disable-line import/no-named-as-default
import AuthorProfileHeadTwitter from "../src/author-profile-head-twitter";
import longSummaryLength from "../author-profile-constants";

export default () => {
  const mockArticles = fixtureGenerator.makeArticleMocks({
    pageSize: 3,
    withImages: true
  });
  const mockArticlesWithoutImages = fixtureGenerator.makeArticleMocks({
    longSummaryLength,
    pageSize: 3,
    withImages: false
  });
  const mockAuthor = fixtureGenerator.makeAuthor({ withImages: true });
  const mockAuthorWithoutImages = fixtureGenerator.makeAuthor({
    withImages: false
  });

  const props = {
    analyticsStream: () => {},
    author: mockAuthor,
    isLoading: false,
    onArticlePress: () => {},
    onTwitterLinkPress: () => {},
    page: 1,
    pageSize: 3,
    refetch: () => {},
    slug: "deborah-haynes"
  };

  const realIntl = Intl;

  beforeAll(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });

  afterAll(() => {
    global.Intl = realIntl;
  });

  it("should render with images", async () => {
    const tree = renderer.create(
      <MockedProvider mocks={mockArticles}>
        <AuthorProfile {...props} />
      </MockedProvider>
    );

    await delay(1500);

    expect(tree).toMatchSnapshot("1. Render an author profile page");
  });

  it("should render without images", async () => {
    const tree = renderer.create(
      <MockedProvider mocks={mockArticlesWithoutImages}>
        <AuthorProfile {...props} author={mockAuthorWithoutImages} />
      </MockedProvider>
    );

    await delay(1500);

    expect(tree).toMatchSnapshot(
      "2. Render an author profile page without images"
    );
  });

  it("should render the loading state", () => {
    const tree = renderer.create(
      <MockedProvider mocks={mockArticles}>
        <AuthorProfile {...props} isLoading />
      </MockedProvider>
    );

    expect(tree).toMatchSnapshot(
      "3. Render an author profile page loading state"
    );
  });

  it("should render the author page with an article list page error state", () => {
    const tree = renderer.create(<AuthorProfile {...props} error={{}} />);

    expect(tree).toMatchSnapshot(
      "4. Render an author profile page error state"
    );
  });

  context("AuthorProfileHead shared tests", () => {
    const mockOnPress = jest.fn();
    const twitterProps = {
      isLoading: false,
      onTwitterLinkPress: mockOnPress,
      twitter: "testTwitterHandle",
      url: "www.twitter.com/"
    };

    it("should render with no twitter handle", () => {
      const wrapper = shallow(
        <AuthorProfileHead {...twitterProps} twitter="sdasdasd" />
      );

      expect(wrapper).toMatchSnapshot(
        "5. Render an author profile header with a twitter link"
      );
    });

    it("should render with no twitter handle", () => {
      const wrapper = shallow(
        <AuthorProfileHead {...twitterProps} twitter="" />
      );

      expect(wrapper).toMatchSnapshot(
        "6. Render an author profile header without a twitter link"
      );
    });

    it("should handle the twitter link when pressed", () => {
      const wrapper = shallow(<AuthorProfileHeadTwitter {...twitterProps} />);

      wrapper.find("TextLink").simulate("press");

      expect(mockOnPress).toHaveBeenCalled();
    });
  });

  it("should send analytics when rendering an author profile page", () => {
    const reporter = jest.fn();

    renderer.create(
      <MockedProvider mocks={mockArticles}>
        <AuthorProfile {...props} analyticsStream={reporter} />
      </MockedProvider>
    );

    const call = reporter.mock.calls[0][0];
    const callWithoutEventTime =
      call.attrs && call.attrs.eventTime
        ? [{ ...call, attrs: { ...call.attrs, eventTime: null } }]
        : call;

    expect(callWithoutEventTime).toMatchSnapshot(
      "8. Author profile page analytics"
    );
  });
};
