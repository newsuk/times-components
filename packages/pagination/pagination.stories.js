import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import Pagination from "./pagination";

const story = m => <View style={{ paddingTop: 20 }}>{m}</View>;

storiesOf("Pagination", module)
  .add("First page", () =>
    story(
      <Pagination
        page={1}
        count={60}
        onNext={action("first-page-next")}
        onPrev={action("first-page-prev")}
      />
    )
  )
  .add("Another page", () =>
    story(
      <Pagination
        page={2}
        count={60}
        onNext={action("another-page-next")}
        onPrev={action("another-page-prev")}
      />
    )
  )
  .add("Last page", () =>
    story(
      <Pagination
        page={3}
        count={60}
        onNext={action("last-page-next")}
        onPrev={action("last-page-prev")}
      />
    )
  )
  .add("First page without results information", () =>
    story(
      <Pagination
        page={1}
        count={60}
        compact
        onNext={action("first-page-next-compact")}
        onPrev={action("first-page-prev-compact")}
      />
    )
  )
  .add("Another page without results information", () =>
    story(
      <Pagination
        page={2}
        count={60}
        compact
        onNext={action("another-page-next-compact")}
        onPrev={action("another-page-prev-compact")}
      />
    )
  )
  .add("Last page without results information", () =>
    story(
      <Pagination
        page={3}
        count={60}
        compact
        onNext={action("last-page-next-compact")}
        onPrev={action("last-page-prev-compact")}
      />
    )
  );
