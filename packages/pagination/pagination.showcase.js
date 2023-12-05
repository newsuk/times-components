/* eslint-disable react/prop-types */
import React from "react";
import { LateralSpacingDecorator } from "@times-components/storybook";
import storybookReporter from "@times-components/tealium-utils";
import { withTrackingContext } from "@times-components/tracking";
import Pagination from "./src/pagination";
import { PreviousPageIcon, NextPageIcon } from "./src/pagination-icons";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const createPagination = ({ decorateAction, overrideProps = {} }) => {
  const props = {
    count: 60,
    generatePageLink: pageNum => `?page=${pageNum}`,
    onNext: preventDefaultedAction(decorateAction)("first-page-next"),
    onPrev: preventDefaultedAction(decorateAction)("first-page-prev"),
    page: 1,
    ...overrideProps
  };

  return <Pagination {...props} />;
};

const pagination = {
  children: [
    {
      decorator: LateralSpacingDecorator,
      type: "decorator"
    },
    {
      component: (_, { decorateAction }) =>
        createPagination({ decorateAction }),
      name: "First page",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        const overrideProps = {
          onNext: preventDefaultedAction(decorateAction)("another-page-next"),
          onPrev: preventDefaultedAction(decorateAction)("another-page-prev"),
          page: 2
        };

        return createPagination({ decorateAction, overrideProps });
      },
      name: "Another page",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        const overrideProps = {
          onNext: preventDefaultedAction(decorateAction)("last-page-next"),
          onPrev: preventDefaultedAction(decorateAction)("last-page-prev"),
          page: 3
        };

        return createPagination({ decorateAction, overrideProps });
      },
      name: "Last page",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        const overrideProps = {
          hideResults: true
        };

        return createPagination({ decorateAction, overrideProps });
      },
      name: "First page without results information",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        {
          const overrideProps = {
            hideResults: true,
            onNext: preventDefaultedAction(decorateAction)(
              "another-page-next-compact"
            ),
            onPrev: preventDefaultedAction(decorateAction)(
              "another-page-prev-compact"
            ),
            page: 2
          };

          return createPagination({ decorateAction, overrideProps });
        }
      },
      name: "Another page without results information",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        {
          const overrideProps = {
            hideResults: true,
            onNext: preventDefaultedAction(decorateAction)(
              "last-page-next-compact"
            ),
            onPrev: preventDefaultedAction(decorateAction)(
              "last-page-prev-compact"
            ),
            page: 3
          };

          return createPagination({ decorateAction, overrideProps });
        }
      },
      name: "Last page without results information",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        const PaginationWithTrackingContext = withTrackingContext(Pagination, {
          trackingObjectName: "Story"
        });

        return (
          <PaginationWithTrackingContext
            analyticsStream={storybookReporter}
            count={60}
            generatePageLink={pageNum => `?page=${pageNum}`}
            hideResults
            onNext={preventDefaultedAction(decorateAction)("onNext")}
            onPrev={preventDefaultedAction(decorateAction)("onPrev")}
            page={2}
          />
        );
      },
      name: "Tracking",
      type: "story"
    }
  ],
  name: "Composed/Pagination"
};

export const icons = {
  children: [
    {
      decorator: LateralSpacingDecorator,
      type: "decorator"
    },
    {
      component: () => <PreviousPageIcon label="Previous Page" />,
      name: "previous page icon",
      type: "story"
    },
    {
      component: () => <NextPageIcon label="Next Page" />,
      name: "next page icon",
      type: "story"
    }
  ],
  name: "Composed/Pagination/Icons"
};

export default pagination;
