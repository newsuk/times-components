import React from "react";
import { View } from "react-native";
import { withTrackingContext } from "@times-components/tracking";
import { LateralSpacingDecorator } from "@times-components/storybook";
import Pagination, { withPageState } from "./src/pagination";
import { PreviousPageIcon, NextPageIcon } from "./src/pagination-icons";

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
      component: (_, { action }) => (
        <Pagination
          count={60}
          onNext={action("first-page-next")}
          onPrev={action("first-page-prev")}
          page={1}
        />
      )
    },
    {
      type: "story",
      name: "Another page",
      component: (_, { action }) => (
        <Pagination
          count={60}
          onNext={action("another-page-next")}
          onPrev={action("another-page-prev")}
          page={2}
        />
      )
    },
    {
      type: "story",
      name: "Last page",
      component: (_, { action }) => (
        <Pagination
          count={60}
          onNext={action("last-page-next")}
          onPrev={action("last-page-prev")}
          page={3}
        />
      )
    },
    {
      type: "story",
      name: "First page without results information",
      component: (_, { action }) => (
        <Pagination
          count={60}
          hideResults
          onNext={action("first-page-next-compact")}
          onPrev={action("first-page-prev-compact")}
          page={1}
        />
      )
    },
    {
      type: "story",
      name: "Another page without results information",
      component: (_, { action }) => (
        <Pagination
          count={60}
          hideResults
          onNext={action("another-page-next-compact")}
          onPrev={action("another-page-prev-compact")}
          page={2}
        />
      )
    },
    {
      type: "story",
      name: "Last page without results information",
      component: (_, { action }) => (
        <Pagination
          count={60}
          hideResults
          onNext={action("last-page-next-compact")}
          onPrev={action("last-page-prev-compact")}
          page={3}
        />
      )
    },
    {
      type: "story",
      name: "Tracking",
      component: (_, { action }) => {
        const pageHandler = e => e.preventDefault();
        const PaginationWithTrackingContext = withTrackingContext(Pagination, {
          trackingObjectName: "Story"
        });

        return (
          <PaginationWithTrackingContext
            analyticsStream={action("analytics-event")}
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
