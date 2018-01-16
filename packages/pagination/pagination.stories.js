import React from "react";
import { View } from "react-native";
import { storiesOf } from "dextrose/storiesOfOverloader";
import { action } from "@storybook/addon-actions";
import { withTrackingContext } from "@times-components/tracking";
import { LateralSpacingDecorator } from "@times-components/storybook/decorators";
import Pagination, { withPageState } from "./pagination";
import { PreviousPageIcon, NextPageIcon } from "./pagination-icons";

storiesOf("Pagination", module)
  .addDecorator(LateralSpacingDecorator)
  .add("First page", () => (
    <Pagination
      page={1}
      count={60}
      onChangePage={action("first-page-change")}
    />
  ))
  .add("Another page", () => (
    <Pagination
      page={2}
      count={60}
      onChangePage={action("another-page-change")}
    />
  ))
  .add("Last page", () => (
    <Pagination page={3} count={60} onChangePage={action("last-page-change")} />
  ))
  .add("First page without results information", () => (
    <Pagination
      page={1}
      count={60}
      hideResults
      onChangePage={action("first-page-change-compact")}
    />
  ))
  .add("Another page without results information", () => (
    <Pagination
      page={2}
      count={60}
      hideResults
      onChangePage={action("another-page-change-compact")}
    />
  ))
  .add("Last page without results information", () => (
    <Pagination
      page={3}
      count={60}
      hideResults
      onChangePage={action("last-page-change-compact")}
    />
  ))
  .add("Without top keyline", () => (
    <Pagination
      page={2}
      count={60}
      hideTopKeyline
      onChangePage={action("without-top-keyline-change-page")}
    />
  ))
  .add("Without bottom keyline", () => (
    <Pagination
      page={2}
      count={60}
      hideBottomKeyline
      onChangePage={action("without-bottom-keyline-change-page")}
    />
  ))
  .add("Tracking", () => {
    const PaginationWithTrackingContext = withTrackingContext(Pagination, {
      trackingObject: "Story"
    });
    return (
      <PaginationWithTrackingContext
        page={2}
        count={60}
        hideResults
        analyticsStream={action("analytics-event")}
      />
    );
  });

const PageChanger = withPageState(Pagination);

storiesOf("Pagination Helper", module)
  .addDecorator(story => <View style={{ paddingTop: 20 }}>{story()}</View>)
  .add("First page", () => <PageChanger page={1} count={60} />)
  .add("Another page", () => <PageChanger page={2} count={60} />)
  .add("Last page", () => <PageChanger page={3} count={60} />)
  .add("First page without results information", () => (
    <PageChanger page={1} count={60} hideResults />
  ))
  .add("Another page without results information", () => (
    <PageChanger page={2} count={60} hideResults />
  ))
  .add("Last page without results information", () => (
    <PageChanger page={3} count={60} hideResults />
  ));

storiesOf("Pagination Icons", module)
  .addDecorator(story => <View style={{ paddingTop: 20 }}>{story()}</View>)
  .add("previous page icon", () => <PreviousPageIcon label="Previous Page" />)
  .add("next page icon", () => <NextPageIcon label="Next Page" />);
