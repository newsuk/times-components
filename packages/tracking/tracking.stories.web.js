import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import { withTrackingContext, withTrackChildViews } from "./tracking";
import storybookReporter from "../../storybook/storybook-tealium-reporter";
import Boxes from "./storybook-components/boxes";

storiesOf("Tracking", module).add("Scroll depth tracking", () => {
  const boxes = [...Array(50).keys()].map(i => ({
    id: `box-${i + 1}`,
    color: i % 2 === 0 ? "green" : "blue"
  }));
  const BoxesWithTrackingContext = withTrackingContext(
    withTrackChildViews(Boxes, {
      childIdPropKey: "id",
      actionName: "Scrolled",
      getAttrs: props => ({
        id: props.id
      })
    }),
    { trackingObject: "Story" }
  );
  return (
    <BoxesWithTrackingContext
      onViewed={() => {}}
      boxes={boxes}
      analyticsStream={storybookReporter}
    />
  );
});
