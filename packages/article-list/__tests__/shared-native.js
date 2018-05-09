import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Link from "@times-components/link";
import Pagination from "@times-components/pagination";
import ArticleList from "../src/article-list";
import ArticleListItem from "../src/article-list-item";
import articleListProps from "./default-article-list-props";
import pagedResult from "./paged-result";

export default () => {
  it("should emit scroll tracking events for an article list", () => {
    const reporter = jest.fn();
    const results = pagedResult(0, 3);
    const wrapper = shallow(
      <ArticleList
        {...articleListProps}
        articles={results.articles.list}
        count={10}
        page={1}
        pageSize={3}
      />,
      {
        context: {
          tracking: {
            analytics: reporter
          }
        }
      }
    );
    wrapper
      .dive()
      .instance()
      .onViewableItemsChanged.call(wrapper.instance(), {
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

  it("should not emit scroll tracking events for an article list when nothing has changed", () => {
    const reporter = jest.fn();
    const results = pagedResult(0, 3);
    const wrapper = shallow(
      <ArticleList
        {...articleListProps}
        articles={results.articles.list}
        count={10}
        page={1}
        pageSize={3}
      />,
      {
        context: {
          tracking: {
            analytics: reporter
          }
        }
      }
    );
    wrapper
      .dive()
      .instance()
      .onViewableItemsChanged.call(wrapper.instance(), {
        changed: []
      });
    expect(reporter).not.toHaveBeenCalled();
  });

  it("should handle the link to an article from an article list", () => {
    const onArticlePress = jest.fn();
    const results = pagedResult(0, 3);
    const comp = renderer.create(
      <ArticleList
        {...articleListProps}
        articles={results.articles.list}
        articlesLoading={false}
        count={10}
        isLoading={false}
        onArticlePress={onArticlePress}
        page={1}
        pageSize={3}
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

  it("should invoke onPrev when the previous link is pressed", () => {
    const onPrev = jest.fn();
    const results = pagedResult(0, 3);
    const comp = renderer.create(
      <ArticleList
        {...articleListProps}
        articles={results.articles.list}
        articlesLoading={false}
        count={10}
        isLoading={false}
        onPrev={onPrev}
        page={2}
        pageSize={3}
      />
    ).root;
    comp
      .findAllByType(Pagination)[0]
      .findAllByType(Link)[0]
      .props.onPress();
    expect(onPrev).toHaveBeenCalled();
  });

  it("should invoke onNext when the next link is pressed", () => {
    const onNext = jest.fn();
    const results = pagedResult(0, 3);
    const comp = renderer.create(
      <ArticleList
        {...articleListProps}
        articles={results.articles.list}
        articlesLoading={false}
        count={10}
        isLoading={false}
        onNext={onNext}
        page={2}
        pageSize={3}
      />
    ).root;
    comp
      .findAllByType(Pagination)[0]
      .findAllByType(Link)[1]
      .props.onPress();
    expect(onNext).toHaveBeenCalled();
  });
};
