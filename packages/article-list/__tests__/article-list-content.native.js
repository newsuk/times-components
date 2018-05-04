import React from "react";
import { shallow } from "enzyme";
import RCT from "react-test-renderer";
import Link from "@times-components/link";
import Pagination from "@times-components/pagination";
import { fixtureGenerator } from "@times-components/provider-test-tools";
import authorProfileFixture from "@times-components/provider-test-tools/fixtures/author-profile/author-profile.json";
import ArticleListItem from "../src/article-list-item";
import pagedResult from "./paged-result";
import test from "./helper";
import ArticleList from "../src/article-list.js";

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

export default () => {
  // it("renders profile error", () => {
  //   const props = {
  //     slug: "deborah-haynes",
  //     analyticsStream: () => {},
  //     error: new Error("broken")
  //   };

  //   // react test renderer would be preferred here but there is a bug
  //   // in RNW that throws an exception when rendering Button
  //   const wrapper = shallow(<AuthorProfile {...props} />);

  //   expect(
  //     wrapper
  //       .dive()
  //       .dive()
  //       .dive()
  //   ).toMatchSnapshot();
  // });

  it("renders page error", () => {
    const wrapper = shallow(
      <ArticleList
        articles={[]}
        author={fixtureGenerator.makeAuthor()}
        count={0}
        error={new Error("Failed")}
        imageRatio={3 / 2}
        onArticlePress={() => {}}
        onViewed={() => {}}
        onTwitterLinkPress={() => {}}
        page={1}
        pageSize={3}
        refetch={() => {}}
        slug="deborah-haynes"
      />
    );

    expect(
      wrapper
        .dive()
        .dive()
        .find("AuthorProfileListError")
        .dive()
    ).toMatchSnapshot();
  });

  it("emits scroll tracking events for author profile content", () => {
    const reporter = jest.fn();
    const results = pagedResult(0, 3);
    const authorProfileContent = shallow(
      <ArticleList
        articles={results.data.author.articles.list}
        author={authorProfileFixture.data.author}
        count={10}
        imageRatio={3 / 2}
        onArticlePress={() => {}}
        onTwitterLinkPress={() => {}}
        page={1}
        pageSize={3}
        slug="deborah-haynes"
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
              elementId: "f79c9d8c-c95c-11e7-b529-95e3fc05f40f.2"
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
      <ArticleList
        articles={results.data.author.articles.list}
        author={authorProfileFixture.data.author}
        count={10}
        imageRatio={3 / 2}
        onArticlePress={() => {}}
        onTwitterLinkPress={() => {}}
        page={1}
        pageSize={3}
        slug="deborah-haynes"
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
      <ArticleList
        articles={results.data.author.articles.list}
        articlesLoading={false}
        author={authorProfileFixture.data.author}
        count={10}
        imageRatio={3 / 2}
        isLoading={false}
        onArticlePress={onArticlePress}
        onTwitterLinkPress={() => {}}
        page={1}
        pageSize={3}
        slug="deborah-haynes"
      />
    ).root;

    comp
      .findAllByType(ArticleListItem)[0]
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
      <ArticleList
        articles={results.data.author.articles.list}
        articlesLoading={false}
        author={authorProfileFixture.data.author}
        count={10}
        imageRatio={3 / 2}
        isLoading={false}
        onArticlePress={() => {}}
        onPrev={onPrev}
        onTwitterLinkPress={() => {}}
        page={2}
        pageSize={3}
        slug="deborah-haynes"
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
      <ArticleList
        articles={results.data.author.articles.list}
        articlesLoading={false}
        author={authorProfileFixture.data.author}
        count={10}
        imageRatio={3 / 2}
        isLoading={false}
        onArticlePress={() => {}}
        onNext={onNext}
        onTwitterLinkPress={() => {}}
        page={2}
        pageSize={3}
        slug="deborah-haynes"
      />
    ).root;

    comp
      .findAllByType(Pagination)[0]
      .findAllByType(Link)[1]
      .props.onPress();

    expect(onNext).toHaveBeenCalled();
  });

  test(ArticleList);
};
