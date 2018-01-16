import React from "react";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import RCT from "react-test-renderer";
import Link from "@times-components/link";
import Pagination from "@times-components/pagination";
import { makeAuthor } from "@times-components/provider/fixtures/author-profile/fixture-generator";
import authorProfileFixture from "@times-components/provider/fixtures/author-profile/author-profile.json";
import AuthorProfile from "../author-profile";
import AuthorProfileItem from "../author-profile-item";
import pagedResult from "./paged-result";
import test from "./author-profile-helper";
import AuthorProfileContent from "../author-profile-content.js";

// A hack until this is resolved: https://github.com/facebook/react-native/pull/13048
jest.mock("ScrollView", () => {
  const MockScrollView = require.requireMock("ScrollViewMock");
  const React = require("React"); // eslint-disable-line
  const RealScrollView = require.requireActual("ScrollView");
  class ScrollView extends React.Component {
    scrollTo() {
      return this;
    }

    render() {
      return <MockScrollView {...this.props} />;
    }
  }
  ScrollView.propTypes = RealScrollView.propTypes;
  return ScrollView;
});

Enzyme.configure({ adapter: new React16Adapter() });

it("renders profile error", () => {
  const props = {
    slug: "deborah-haynes",
    analyticsStream: () => {},
    error: new Error("broken")
  };

  // react test renderer would be preferred here but there is a bug
  // in RNW that throws an exception when rendering Button
  const wrapper = shallow(<AuthorProfile {...props} />);

  expect(
    wrapper
      .dive()
      .dive()
      .dive()
  ).toMatchSnapshot();
});

it("renders page error", () => {
  const wrapper = shallow(
    <AuthorProfileContent
      count={0}
      articles={[]}
      author={makeAuthor()}
      slug="deborah-haynes"
      page={1}
      pageSize={3}
      imageRatio={3 / 2}
      error={new Error("Failed")}
      refetch={() => {}}
      onTwitterLinkPress={() => {}}
      onArticlePress={() => {}}
      onViewed={() => {}}
    />
  );

  expect(
    wrapper
      .dive()
      .dive()
      .find("AuthorProfileListingError")
      .dive()
  ).toMatchSnapshot();
});

it("emits scroll tracking events for author profile content", () => {
  const reporter = jest.fn();
  const results = pagedResult(0, 3);
  const authorProfileContent = shallow(
    <AuthorProfileContent
      count={10}
      articles={results.data.author.articles.list}
      author={authorProfileFixture.data.author}
      slug="deborah-haynes"
      page={1}
      pageSize={3}
      imageRatio={3 / 2}
      onTwitterLinkPress={() => {}}
      onArticlePress={() => {}}
    />,
    {
      context: {
        tracking: {
          analytics: reporter
        }
      }
    }
  );
  authorProfileContent
    .dive()
    .instance()
    .onViewableItemsChanged.call(authorProfileContent.instance(), {
      changed: [
        {
          isViewable: true,
          item: {
            elementId: "articleList-1-2"
          }
        }
      ]
    });

  expect(reporter).toHaveBeenCalledWith(
    expect.objectContaining({
      attrs: expect.objectContaining({
        scrollDepth: {
          itemNumber: 3,
          total: 3
        }
      })
    })
  );
});

it("does not emit scroll tracking events for author profile content when nothing changed", () => {
  const reporter = jest.fn();
  const results = pagedResult(0, 3);
  const authorProfileContent = shallow(
    <AuthorProfileContent
      count={10}
      articles={results.data.author.articles.list}
      author={authorProfileFixture.data.author}
      slug="deborah-haynes"
      page={1}
      pageSize={3}
      imageRatio={3 / 2}
      onTwitterLinkPress={() => {}}
      onArticlePress={() => {}}
    />,
    {
      context: {
        tracking: {
          analytics: reporter
        }
      }
    }
  );
  authorProfileContent
    .dive()
    .instance()
    .onViewableItemsChanged.call(authorProfileContent.instance(), {
      changed: []
    });

  expect(reporter).not.toHaveBeenCalled();
});

it("handles an article press", () => {
  const onArticlePress = jest.fn();
  const results = pagedResult(0, 3);

  const comp = RCT.create(
    <AuthorProfileContent
      count={10}
      articles={results.data.author.articles.list}
      author={authorProfileFixture.data.author}
      isLoading={false}
      articlesLoading={false}
      slug="deborah-haynes"
      page={1}
      pageSize={3}
      imageRatio={3 / 2}
      onTwitterLinkPress={() => {}}
      onArticlePress={onArticlePress}
    />
  ).root;

  comp
    .findAllByType(AuthorProfileItem)[0]
    .findByType(Link)
    .props.onPress();

  expect(onArticlePress).toHaveBeenCalledWith(undefined, {
    id: "d98c257c-cb16-11e7-b529-95e3fc05f40f",
    url:
      "https://www.thetimes.co.uk/article/top-medal-for-forces-dog-who-took-a-bite-out-of-the-taliban-vgklxs37f"
  });
});

it("invokes onPrev when the previous link is pressed", () => {
  const onPrev = jest.fn();
  const results = pagedResult(0, 3);

  const comp = RCT.create(
    <AuthorProfileContent
      count={10}
      articles={results.data.author.articles.list}
      author={authorProfileFixture.data.author}
      isLoading={false}
      articlesLoading={false}
      slug="deborah-haynes"
      page={2}
      pageSize={3}
      imageRatio={3 / 2}
      onTwitterLinkPress={() => {}}
      onArticlePress={() => {}}
      onPrev={onPrev}
    />
  ).root;

  comp
    .findAllByType(Pagination)[0]
    .findAllByType(Link)[0]
    .props.onPress();

  expect(onPrev).toHaveBeenCalled();
});

it("invokes onNext when the next link is pressed", () => {
  const onNext = jest.fn();
  const results = pagedResult(0, 3);

  const comp = RCT.create(
    <AuthorProfileContent
      count={10}
      articles={results.data.author.articles.list}
      author={authorProfileFixture.data.author}
      isLoading={false}
      articlesLoading={false}
      slug="deborah-haynes"
      page={2}
      pageSize={3}
      imageRatio={3 / 2}
      onTwitterLinkPress={() => {}}
      onArticlePress={() => {}}
      onNext={onNext}
    />
  ).root;

  comp
    .findAllByType(Pagination)[0]
    .findAllByType(Link)[1]
    .props.onPress();

  expect(onNext).toHaveBeenCalled();
});

it("scrolls to top when next page is clicked");

it("scrolls to top when prev page is clicked");

test(AuthorProfileContent);
