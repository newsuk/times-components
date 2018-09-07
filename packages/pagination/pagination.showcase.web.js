import React from "react";
import { View } from "react-native";
import { withTrackingContext } from "@times-components/tracking";
import { LateralSpacingDecorator } from "@times-components/storybook";
import Pagination, { withPageState } from "./src/pagination";
import { PreviousPageIcon, NextPageIcon } from "./src/pagination-icons";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const createPagination = ({ decorateAction, overrideProps = {} }) => {
  const props = {
    ...overrideProps,
    count: 60,
    generatePageLink: preventDefaultedAction(decorateAction)("generatePageLink"),
    onNext: decorateAction("first-page-next"),
    onPrev: decorateAction("first-page-prev"),
    page: 1
  };

  return (
    <Pagination
      {...props}
    />
  );
};

const pagination = {
  name: "Composed/Pagination",
  children: [
    {
      type: "decorator",
      decorator: LateralSpacingDecorator
    },
    {
      type: "story",
      name: "First page",
      component: (_, { decorateAction }) => (
        createPagination({ decorateAction })
      )
    },
    {
      type: "story",
      name: "Another page",
      component: (_, { decorateAction }) => {
        const overrideProps = {
          onNext: decorateAction("another-page-next"),
          onPrev: decorateAction("another-page-prev"),
          page: 2
        };

        return createPagination({ decorateAction, overrideProps })
      }
    },
    {
      type: "story",
      name: "Last page",
      component: (_, { decorateAction }) => (
        <Pagination
          count={60}
          onNext={decorateAction("last-page-next")}
          onPrev={decorateAction("last-page-prev")}
          page={3}
        />
      )
    },
    {
      type: "story",
      name: "First page without results information",
      component: (_, { decorateAction }) => (
        <Pagination
          count={60}
          hideResults
          onNext={decorateAction("first-page-next-compact")}
          onPrev={decorateAction("first-page-prev-compact")}
          page={1}
        />
      )
    },
    {
      type: "story",
      name: "Another page without results information",
      component: (_, { decorateAction }) => (
        <Pagination
          count={60}
          hideResults
          onNext={decorateAction("another-page-next-compact")}
          onPrev={decorateAction("another-page-prev-compact")}
          page={2}
        />
      )
    },
    {
      type: "story",
      name: "Last page without results information",
      component: (_, { decorateAction }) => (
        <Pagination
          count={60}
          hideResults
          onNext={decorateAction("last-page-next-compact")}
          onPrev={decorateAction("last-page-prev-compact")}
          page={3}
        />
      )
    },
    {
      type: "story",
      name: "Tracking",
      component: (_, { decorateAction }) => {
        const pageHandler = e => e.preventDefault();
        const PaginationWithTrackingContext = withTrackingContext(Pagination, {
          trackingObjectName: "Story"
        });

        return (
          <PaginationWithTrackingContext
            analyticsStream={decorateAction("analytics-event")}
            count={60}
            hideResults
            onNext={pageHandler}
            onPrev={pageHandler}
            page={2}
          />
        );
      }
    }
  ]
};

const PageChanger = withPageState(Pagination);

export const helper = {
  name: "Composed/Pagination/Helper",
  children: [
    {
      type: "decorator",
      decorator: story => <View style={{ paddingTop: 20 }}>{story()}</View>
    },
    {
      type: "story",
      name: "First page",
      component: () => <PageChanger count={60} page={1} />
    },
    {
      type: "story",
      name: "Another page",
      component: () => <PageChanger count={60} page={2} />
    },
    {
      type: "story",
      name: "Last page",
      component: () => <PageChanger count={60} page={3} />
    },
    {
      type: "story",
      name: "First page without results information",
      component: () => <PageChanger count={60} hideResults page={1} />
    },
    {
      type: "story",
      name: "Another page without results information",
      component: () => <PageChanger count={60} hideResults page={2} />
    },
    {
      type: "story",
      name: "Last page without results information",
      component: () => <PageChanger count={60} hideResults page={3} />
    }
  ]
};

export const icons = {
  name: "Composed/Pagination/Icons",
  children: [
    {
      type: "decorator",
      decorator: story => <View style={{ paddingTop: 20 }}>{story()}</View>
    },
    {
      type: "story",
      name: "previous page icon",
      component: () => <PreviousPageIcon label="Previous Page" />
    },
    {
      type: "story",
      name: "next page icon",
      component: () => <NextPageIcon label="Next Page" />
    }
  ]
};

export default pagination;
