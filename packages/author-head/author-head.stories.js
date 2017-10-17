import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { decorateAction, action } from "@storybook/addon-actions";
import { withTrackingContext } from "@times-components/tracking";
import AuthorHead from "./author-head";
import LateralSpacingDecorator from "../../storybook/decorators/lateral-spacing";

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

storiesOf("AuthorHead", module)
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
      trackingObject: "Story"
    });
    return (
      <AuthorHeadWithTrackingContext
        {...data}
        {...extras}
        analyticsStream={action("analytics-event")}
      />
    );
  });
