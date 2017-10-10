import React from "react";
import { View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
import Pagination, { withPageState } from "./pagination";
import { PreviousPageIcon, NextPageIcon } from "./pagination-icons";

storiesOf("Pagination", module)
  .addDecorator(story => <View style={{ paddingTop: 20 }}>{story()}</View>)
  .add("First page", () => (
    <Pagination
      page={1}
      count={60}
      onNext={action("first-page-next")}
      onPrev={action("first-page-prev")}
    />
  ))
  .add("Another page", () => (
    <Pagination
      page={2}
      count={60}
      onNext={action("another-page-next")}
      onPrev={action("another-page-prev")}
    />
  ))
  .add("Last page", () => (
    <Pagination
      page={3}
      count={60}
      onNext={action("last-page-next")}
      onPrev={action("last-page-prev")}
    />
  ))
  .add("First page without results information", () => (
    <Pagination
      page={1}
      count={60}
      hideResults
      onNext={action("first-page-next-compact")}
      onPrev={action("first-page-prev-compact")}
    />
  ))
  .add("Another page without results information", () => (
    <Pagination
      page={2}
      count={60}
      hideResults
      onNext={action("another-page-next-compact")}
      onPrev={action("another-page-prev-compact")}
    />
  ))
  .add("Last page without results information", () => (
    <Pagination
      page={3}
      count={60}
      hideResults
      onNext={action("last-page-next-compact")}
      onPrev={action("last-page-prev-compact")}
    />
  ));

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
