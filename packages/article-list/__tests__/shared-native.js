import React from "react";
import { FlatList } from "react-native";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Link from "@times-components/link";
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

  it("should fetch more articles when scrolling to bottom", () => {
    const fetchMore = jest.fn().mockReturnValue(Promise.resolve());
    const results = pagedResult(0, 3);
    const tree = renderer.create(
      <ArticleList
        {...articleListProps}
        articles={results.articles.list}
        articlesLoading={false}
        count={10}
        isLoading={false}
        page={1}
        pageSize={3}
        fetchMore={fetchMore}
      />
    );

    tree.root.findByType(FlatList).props.onEndReached();

    expect(fetchMore).toHaveBeenCalled();
  });

  it("should display retry button when fetch more fails", async () => {
    const fetchMore = jest
      .fn()
      .mockReturnValue(Promise.reject(new Error("Error")));
    const results = pagedResult(0, 3);
    const wrapper = shallow(
      <ArticleList
        {...articleListProps}
        articles={results.articles.list}
        articlesLoading={false}
        count={10}
        isLoading={false}
        page={1}
        pageSize={3}
        fetchMore={fetchMore}
      />
    ).dive();
    wrapper.setState({ loadMoreError: null });

    await wrapper
      .find("FlatList")
      .props()
      .onEndReached();

    expect(
      wrapper
        .dive()
        .dive()
        .dive()
        .dive()
        .find("articleListFooter")
        .dive()
    ).toMatchSnapshot();
  });

  it("should clear errors and fetch more when retry button clicked", () => {
    const fetchMore = jest.fn().mockReturnValue(Promise.resolve());
    const results = pagedResult(0, 3);
    const wrapper = shallow(
      <ArticleList
        {...articleListProps}
        articles={results.articles.list}
        articlesLoading={false}
        count={10}
        isLoading={false}
        page={1}
        pageSize={3}
        fetchMore={fetchMore}
      />
    ).dive();
    wrapper.setState({ loadMoreError: "Error" });

    wrapper
      .dive()
      .dive()
      .dive()
      .dive()
      .find("articleListFooter")
      .dive()
      .find("Button")
      .dive()
      .simulate("press");

    expect(wrapper.state().loadMoreError).toBe(null);
    expect(fetchMore).toHaveBeenCalled();
  });

  it("should not call re-fetch after an error", async () => {
    const fetchMore = jest
      .fn()
      .mockReturnValue(Promise.reject(new Error("Error")));
    const results = pagedResult(0, 3);
    const wrapper = shallow(
      <ArticleList
        {...articleListProps}
        articles={results.articles.list}
        articlesLoading={false}
        count={10}
        isLoading={false}
        page={1}
        pageSize={3}
        fetchMore={fetchMore}
      />
    ).dive();
    wrapper.setState({ loadMoreError: null });

    await wrapper
      .find("FlatList")
      .props()
      .onEndReached();

    await wrapper
      .find("FlatList")
      .props()
      .onEndReached();

    expect(fetchMore).toHaveBeenCalledTimes(1);
  });

  it("should not fetch more if a previous fetch is in progress", async () => {
    const fetchMore = jest
      .fn()
      .mockReturnValue(new Promise(resolve => setTimeout(resolve, 100)));
    const results = pagedResult(0, 3);
    const wrapper = shallow(
      <ArticleList
        {...articleListProps}
        articles={results.articles.list}
        articlesLoading={false}
        count={10}
        isLoading={false}
        page={1}
        pageSize={3}
        fetchMore={fetchMore}
      />
    ).dive();

    wrapper
      .find("FlatList")
      .props()
      .onEndReached();
    expect(wrapper.state().loadingMore).toBe(true);

    await wrapper
      .find("FlatList")
      .props()
      .onEndReached();

    expect(fetchMore).toHaveBeenCalledTimes(1);
  });
};
