/* eslint-disable react/prop-types */
import React from "react";
import {
  fixtures,
  MockedProvider,
  MockFixture,
  topic as makeParams
} from "@times-components/provider-test-tools";
import storybookReporter from "@times-components/tealium-utils";
import Topic from "./src/topic";
import TopicProvider from "../provider/src/topic";
import adConfig from "./fixtures/topic-ad-config.json";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const getProps = decorateAction => ({
  adConfig,
  analyticsStream: storybookReporter,
  onArticlePress: preventDefaultedAction(decorateAction)("onArticlePress")
});

const articleImageRatio = "3:2";
const name = "Chelsea";
const pageSize = 20;
const topicSlug = "chelsea";

const makeTopic = (decorateAction, params) => (
  <MockFixture
    params={params}
    render={mocks => (
      <MockedProvider mocks={mocks}>
        <TopicProvider
          articleImageRatio={articleImageRatio}
          debounceTimeMs={250}
          page={1}
          pageSize={pageSize}
          slug={topicSlug}
        >
          {({
            error,
            isLoading,
            page,
            pageSize: authorPageSize,
            refetch,
            topic
          }) => (
            <Topic
              error={error}
              isLoading={isLoading}
              page={page}
              pageSize={authorPageSize}
              refetch={refetch}
              slug={topicSlug}
              topic={topic}
              {...getProps(decorateAction)}
            />
          )}
        </TopicProvider>
      </MockedProvider>
    )}
  />
);

export default {
  children: [
    {
      component: (_, { decorateAction }) =>
        makeTopic(
          decorateAction,
          makeParams({
            articleVariables: iteration => ({
              first: pageSize,
              imageRatio: articleImageRatio,
              skip: (iteration - 1) * pageSize,
              slug: topicSlug
            }),
            makeItem(item, itemIndex) {
              if (fixtures.topicArticles[itemIndex]) {
                return fixtures.topicArticles[itemIndex];
              }

              return item;
            },
            name,
            pageSize,
            slug: topicSlug
          })
        ),
      name: "Default",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <MockedProvider isLoading mocks={[]}>
          <Topic
            {...getProps(decorateAction)}
            isLoading
            refetch={() => {}}
            slug={topicSlug}
          />
        </MockedProvider>
      ),
      name: "Loading",
      type: "story"
    },
    {
      component: (_, { decorateAction }) =>
        makeTopic(
          decorateAction,
          makeParams({
            articleVariables: iteration => ({
              first: pageSize,
              imageRatio: articleImageRatio,
              skip: (iteration - 1) * pageSize,
              slug: topicSlug
            }),
            count: 0,
            delay: 1500,
            name,
            pageSize,
            slug: topicSlug
          })
        ),
      name: "Empty State",
      type: "story"
    },
    {
      component: (_, { decorateAction }) =>
        makeTopic(
          decorateAction,
          makeParams({
            articleVariables: iteration => ({
              first: pageSize,
              imageRatio: articleImageRatio,
              skip: (iteration - 1) * pageSize,
              slug: topicSlug
            }),
            delay: 1000,
            name,
            pageSize,
            slug: topicSlug,
            topicError: () => new Error("Topics Broke")
          })
        ),
      name: "With an error getting Topic",
      type: "story"
    }
  ],
  name: "Pages/Topic"
};
