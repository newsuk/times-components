import React from "react";
import storybookReporter from "@times-components/tealium-utils";
import { withTrackingContext } from "@times-components/tracking";
import { LateralSpacingDecorator } from "@times-components/storybook";
import AuthorHead from "./src/author-head";

const data = require("./fixtures/profile.json");

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const extras = action => ({
  onTwitterLinkPress: action("onTwitterLinkPress")
});

export default {
  name: "Composed/Author Head",
  children: [
    {
      type: "decorator",
      decorator: LateralSpacingDecorator
    },
    {
      type: "story",
      name: "Full Header",
      component: (_, { decorateAction }) => (
        <AuthorHead
          {...data}
          {...extras(preventDefaultedAction(decorateAction))}
        />
      )
    },
    {
      type: "story",
      name: "No profile picture",
      component: (_, { decorateAction }) => {
        const props = {
          ...data,
          uri: ""
        };
        return (
          <AuthorHead
            {...props}
            {...extras(preventDefaultedAction(decorateAction))}
          />
        );
      }
    },
    {
      type: "story",
      name: "Tracking",
      component: (_, { decorateAction }) => {
        const AuthorHeadWithTrackingContext = withTrackingContext(AuthorHead, {
          trackingObjectName: "Story"
        });
        return (
          <AuthorHeadWithTrackingContext
            {...data}
            {...extras(preventDefaultedAction(decorateAction))}
            analyticsStream={storybookReporter}
          />
        );
      }
    }
  ]
};
