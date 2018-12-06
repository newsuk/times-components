import React from "react";
import TestRenderer from "react-test-renderer";
import { shallow } from "enzyme";
import { iterator } from "@times-components/test-utils";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import Context from "@times-components/context";
import ArticleList from "../src/article-list";
import articlesFixture from "../fixtures/articles.json";
import adConfig from "../fixtures/article-ad-config.json";
import { omitWeb as omitProps } from "./utils";

const makeArticleUrl = ({ slug, shortIdentifier }) =>
  slug && shortIdentifier
    ? `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`
    : "";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => omitProps.has(key) || key.includes("Class")
      )
    )
  );

  const tests = [
    {
      name: "next uses onNext callback",
      test() {
        const onNext = jest.fn();
        const testInstance = TestRenderer.create(
          <Context.Provider value={{ makeArticleUrl }}>
            <ArticleList
              adConfig={adConfig}
              articles={articlesFixture}
              count={5}
              emptyStateMessage="Empty state"
              onNext={onNext}
              page={1}
              pageSize={3}
              refetch={() => {}}
            />
          </Context.Provider>
        );

        const [nextPage] = testInstance.root.findAll(
          node => node.props.testID === "page-next"
        );

        nextPage.props.onPress();

        expect(onNext).toHaveBeenCalled();
      }
    },
    {
      name: "previous uses onPrev callback",
      test() {
        const onPrev = jest.fn();
        const testInstance = TestRenderer.create(
          <Context.Provider value={{ makeArticleUrl }}>
            <ArticleList
              adConfig={adConfig}
              articles={articlesFixture}
              count={5}
              emptyStateMessage="Empty state"
              onPrev={onPrev}
              page={2}
              pageSize={3}
              refetch={() => {}}
            />
          </Context.Provider>
        );

        const [prevPage] = testInstance.root.findAll(
          node => node.props.testID === "page-prev"
        );

        prevPage.props.onPress();

        expect(onPrev).toHaveBeenCalled();
      }
    },
    {
      name: "scrolls to top when using bottom next pager",
      test() {
        const windowSpy = jest.spyOn(window, "scroll");
        const onNext = jest.fn();
        const consoleSpy = jest.spyOn(console, "error").mockImplementation();
        const testInstance = TestRenderer.create(
          <Context.Provider value={{ makeArticleUrl }}>
            <ArticleList
              adConfig={adConfig}
              articles={articlesFixture}
              count={5}
              emptyStateMessage="Empty state"
              onNext={onNext}
              page={1}
              pageSize={3}
              refetch={() => {}}
            />
          </Context.Provider>
        );

        const [, nextPage] = testInstance.root.findAll(
          node => node.props.testID === "page-next"
        );

        nextPage.props.onPress();

        expect(window.scroll).toHaveBeenCalledWith({
          left: 0,
          top: 0
        });

        windowSpy.mockRestore();
        consoleSpy.mockRestore();
      }
    },
    {
      name:
        "does not throw when using bottom next pager if window does not exist",
      test() {
        // eslint-disable-next-line prefer-destructuring
        const window = global.window;
        delete global.window;
        jest.spyOn(window, "scroll");

        const onNext = jest.fn();
        const spy = jest.spyOn(console, "error").mockImplementation();

        const wrapper = shallow(
          <ArticleList
            adConfig={adConfig}
            articles={articlesFixture}
            count={5}
            emptyStateMessage="Empty state"
            onNext={onNext}
            page={1}
            pageSize={3}
            refetch={() => {}}
          />
        );

        wrapper
          .dive()
          .dive()
          .find("ArticleListPagination")
          .at(1)
          .dive()
          .find("WithTrackEvents(Pagination)")
          .dive()
          .dive()
          .find("Link")
          .props()
          .onPress();

        global.window = window;
        spy.mockRestore();
      }
    },
    {
      name: "scrolls to top when using bottom previous pager",
      test() {
        const windowSpy = jest.spyOn(window, "scroll");
        const onPrev = jest.fn();
        const consoleSpy = jest.spyOn(console, "error").mockImplementation();
        const testInstance = TestRenderer.create(
          <Context.Provider value={{ makeArticleUrl }}>
            <ArticleList
              adConfig={adConfig}
              articles={articlesFixture}
              count={5}
              emptyStateMessage="Empty state"
              onPrev={onPrev}
              page={2}
              pageSize={3}
              refetch={() => {}}
            />
          </Context.Provider>
        );

        const [, prevPage] = testInstance.root.findAll(
          node => node.props.testID === "page-prev"
        );

        prevPage.props.onPress();

        expect(windowSpy).toHaveBeenCalledWith({
          left: 0,
          top: 0
        });

        windowSpy.mockRestore();
        consoleSpy.mockRestore();
      }
    },
    {
      name:
        "does not throw when using bottom prev pager if window does not exist",
      test() {
        // eslint-disable-next-line prefer-destructuring
        const window = global.window;
        delete global.window;
        jest.spyOn(window, "scroll");

        const onPrev = jest.fn();
        const spy = jest.spyOn(console, "error").mockImplementation();

        const wrapper = shallow(
          <ArticleList
            adConfig={adConfig}
            articles={articlesFixture}
            count={5}
            emptyStateMessage="Empty state"
            onPrev={onPrev}
            page={2}
            pageSize={3}
            refetch={() => {}}
          />
        );

        wrapper
          .dive()
          .dive()
          .find("ArticleListPagination")
          .at(1)
          .dive()
          .find("WithTrackEvents(Pagination)")
          .dive()
          .dive()
          .find("Link")
          .props()
          .onPress();

        global.window = window;
        spy.mockRestore();
      }
    }
  ];

  iterator(tests);
};
