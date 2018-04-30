import React from "react";
import { View } from "react-native";
import { withTrackingContext } from "@times-components/tracking";
import { LateralSpacingDecorator } from "@times-components/storybook";
import Pagination, { withPageState } from "./src/pagination";
import { PreviousPageIcon, NextPageIcon } from "./src/pagination-icons";

export const pagination = {
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
          page={1}
          count={60}
          onNext={action("first-page-next")}
          onPrev={action("first-page-prev")}
        />
      )
    },
    {
      type: "story",
      name: "Another page",
      component: (_, { action }) => (
        <Pagination
          page={2}
          count={60}
          onNext={action("another-page-next")}
          onPrev={action("another-page-prev")}
        />
      )
    },
    {
      type: "story",
      name: "Last page",
      component: (_, { action }) => (
        <Pagination
          page={3}
          count={60}
          onNext={action("last-page-next")}
          onPrev={action("last-page-prev")}
        />
      )
    },
    {
      type: "story",
      name: "First page without results information",
      component: (_, { action }) => (
        <Pagination
          page={1}
          count={60}
          hideResults
          onNext={action("first-page-next-compact")}
          onPrev={action("first-page-prev-compact")}
        />
      )
    },
    {
      type: "story",
      name: "Another page without results information",
      component: (_, { action }) => (
        <Pagination
          page={2}
          count={60}
          hideResults
          onNext={action("another-page-next-compact")}
          onPrev={action("another-page-prev-compact")}
        />
      )
    },
    {
      type: "story",
      name: "Last page without results information",
      component: (_, { action }) => (
        <Pagination
          page={3}
          count={60}
          hideResults
          onNext={action("last-page-next-compact")}
          onPrev={action("last-page-prev-compact")}
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
            page={2}
            count={60}
            hideResults
            analyticsStream={action("analytics-event")}
            onNext={pageHandler}
            onPrev={pageHandler}
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
      component: () => <PageChanger page={1} count={60} />
    },
    {
      type: "story",
      name: "Another page",
      component: () => <PageChanger page={2} count={60} />
    },
    {
      type: "story",
      name: "Last page",
      component: () => <PageChanger page={3} count={60} />
    },
    {
      type: "story",
      name: "First page without results information",
      component: () => <PageChanger page={1} count={60} hideResults />
    },
    {
      type: "story",
      name: "Another page without results information",
      component: () => <PageChanger page={2} count={60} hideResults />
    },
    {
      type: "story",
      name: "Last page without results information",
      component: () => <PageChanger page={3} count={60} hideResults />
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
