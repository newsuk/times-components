import React from "react";
import { storiesOf } from "@storybook/react-native";
import { decorateAction } from "@storybook/addon-actions";
import { storybookReporter } from "@times-components/tealium";
import { withTrackingContext } from "@times-components/tracking";
import { LateralSpacingDecorator } from "@times-components/storybook";
import AuthorHead from "./src/author-head";

const data = require("./fixtures/profile.json");

const preventDefaultedAction = decorateAction([
  ([e, ...args]) => {
    e.preventDefault();
    return ["[SyntheticEvent (storybook prevented default)]", ...args];
  }
]);

const extras = {
  onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress")
};

storiesOf("Composed/AuthorHead", module)
  .addDecorator(LateralSpacingDecorator)
  .add("Full Header", () => <AuthorHead {...data} {...extras} />)
  .add("No profile picture", () => {
    const props = {
      ...data,
      uri: ""
    };
    return <AuthorHead {...props} {...extras} />;
  })
  .add("Tracking", () => {
    const AuthorHeadWithTrackingContext = withTrackingContext(AuthorHead, {
      trackingObjectName: "Story"
    });
    return (
      <AuthorHeadWithTrackingContext
        {...data}
        {...extras}
        analyticsStream={storybookReporter}
      />
    );
  });
