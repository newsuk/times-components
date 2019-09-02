import React from "react";
import { FlatList } from "react-native";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import TestRenderer from "react-test-renderer";
import "./mocks";
import ArticleSummaryHeadline from "@times-components/article-summary";
import { omitNative as omitProps } from "./utils";
import ArticleList from "../src/article-list";
import articlesFixture from "../fixtures/articles.json";
import shared from "./shared.base.native";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => omitProps.has(key))
    )
  );

  const tests = [
    {
      name: "headlines should render",
      test() {
        const testInstance = TestRenderer.create(
          <ArticleList
            articles={articlesFixture.slice(0, 1)}
            count={1}
            emptyStateMessage="Empty state"
            onArticlePress={() => {}}
            pageSize={3}
            refetch={() => {}}
          />
        );

        const headline = testInstance.root.findByType(ArticleSummaryHeadline);
        expect(headline).toBeDefined();
      }
    },
    {
      name: "no footer with data equalling the count",
      test() {
        const testInstance = TestRenderer.create(
          <ArticleList
            articles={articlesFixture.slice(0, 1)}
            count={1}
            emptyStateMessage="Empty state"
            onArticlePress={() => {}}
            pageSize={3}
            refetch={() => {}}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "onViewed is called with changed items",
      test() {
        const onViewed = jest.fn();

        const testInstance = TestRenderer.create(
          <ArticleList
            articles={articlesFixture.slice(0, 2)}
            emptyStateMessage="Empty state"
            onArticlePress={() => {}}
            onViewed={onViewed}
            refetch={() => {}}
          />
        );

        testInstance.root.findByType(FlatList).props.onViewableItemsChanged({
          changed: [
            {
              isViewable: false,
              item: { viewed: false }
            },
            {
              isViewable: true,
              item: { viewed: true }
            }
          ]
        });

        expect(onViewed.mock.calls).toMatchSnapshot();
      }
    },
    {
      name: "removes the retry button when successfully pressed",
      async test() {
        const fetchMore = jest
          .fn()
          .mockReturnValueOnce(Promise.reject(new Error("test")))
          .mockReturnValueOnce(Promise.resolve());

        const testInstance = TestRenderer.create(
          <ArticleList
            articles={articlesFixture.slice(0, 1)}
            emptyStateMessage="Empty state"
            fetchMore={fetchMore}
            onArticlePress={() => {}}
            refetch={() => {}}
          />
        );

        try {
          await testInstance.root.findByType(FlatList).props.onEndReached();
        } catch (e) {
          const button = testInstance.root.find(
            node => typeof node.type === "string" && node.type === "Button"
          );

          await button.props.onPress();

          expect(fetchMore).toHaveBeenCalledTimes(2);

          expect(testInstance).toMatchSnapshot();
        }
      }
    },
    {
      name: "cleans up animation on unmounting",
      test() {
        jest.spyOn(global, "cancelAnimationFrame");

        const testInstance = TestRenderer.create(
          <ArticleList
            articles={[]}
            emptyStateMessage="Empty state"
            onArticlePress={() => {}}
            refetch={() => {}}
          />
        );

        testInstance.unmount();

        expect(global.cancelAnimationFrame).toHaveBeenCalled();
      }
    },
    {
      name:
        "onViewableItemsChanged returns an empty list when nothing has changed",
      test() {
        const testInstance = TestRenderer.create(
          <ArticleList
            articles={articlesFixture}
            emptyStateMessage="Empty state"
            onArticlePress={() => {}}
            onViewed={() => {}}
            refetch={() => {}}
          />
        );
        expect(
          testInstance.root
            .findByType(FlatList)
            .props.onViewableItemsChanged({ changed: [] })
        ).toEqual([]);
      }
    },
    {
      name:
        "fetchMore is called with the expected number when the end of the list is reached",
      test() {
        const fetchMore = jest.fn().mockReturnValue(Promise.resolve());

        const testInstance = TestRenderer.create(
          <ArticleList
            articles={articlesFixture}
            emptyStateMessage="Empty state"
            fetchMore={fetchMore}
            onArticlePress={() => {}}
            refetch={() => {}}
          />
        );

        testInstance.root.findByType(FlatList).props.onEndReached();

        expect(fetchMore).toHaveBeenCalledWith(5);
      }
    },
    {
      name:
        "fetchMore is not called when the end of the list is reached and there are no items",
      test() {
        const fetchMore = jest.fn().mockReturnValue(Promise.resolve());

        const testInstance = TestRenderer.create(
          <ArticleList
            articles={[]}
            articlesLoading
            emptyStateMessage="Empty state"
            fetchMore={fetchMore}
            onArticlePress={() => {}}
            pageSize={0}
            refetch={() => {}}
          />
        );

        testInstance.root.findByType(FlatList).props.onEndReached();

        expect(fetchMore).not.toHaveBeenCalled();
      }
    },
    {
      name:
        "fetchMore is not called when the end of the list is reached during an error state",
      async test() {
        const fetchMore = () => Promise.reject(new Error("test"));

        const testInstance = TestRenderer.create(
          <ArticleList
            articles={articlesFixture.slice(0, 1)}
            emptyStateMessage="Empty state"
            fetchMore={fetchMore}
            onArticlePress={() => {}}
            refetch={() => {}}
          />
        );

        try {
          await testInstance.root.findByType(FlatList).props.onEndReached();
        } catch (e) {
          try {
            await testInstance.root.findByType(FlatList).props.onEndReached();
          } catch (err) {
            expect(fetchMore).toHaveBeenCalledTimes(1);
          }
        }
      }
    },
    {
      name: "fetchMore is not called when still loading more",
      async test() {
        const fetchMore = jest.fn().mockReturnValue(new Promise(() => {}));

        const testInstance = TestRenderer.create(
          <ArticleList
            articles={articlesFixture.slice(0, 1)}
            emptyStateMessage="Empty state"
            fetchMore={fetchMore}
            onArticlePress={() => {}}
            refetch={() => {}}
          />
        );

        testInstance.root.findByType(FlatList).props.onEndReached();
        testInstance.root.findByType(FlatList).props.onEndReached();

        expect(fetchMore).toHaveBeenCalledTimes(1);
      }
    }
  ];

  shared(tests);
};
