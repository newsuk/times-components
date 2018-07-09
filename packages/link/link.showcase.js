import { View } from "react-native";
import React from "react";
import { CenteredDecorator } from "@times-components/storybook";
import { colours } from "@times-components/styleguide";
import Link, { TextLink } from "./src/link";

const BigSquare = props => (
  <View
    style={{
      width: 100,
      height: 100,
      backgroundColor: colours.functional.backgroundSecondary
    }}
    {...props}
  />
);

export default {
  name: "Primitives/Link",
  children: [
    {
      type: "decorator",
      decorator: CenteredDecorator,
      platform: "native"
    },
    {
      type: "story",
      name: "Link with big content",
      component: (_, { action }) => (
        <Link onPress={action("onPress")} url="https://thetimes.co.uk">
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: colours.functional.backgroundSecondary
            }}
          />
        </Link>
      )
    },
    {
      type: "story",
      name: "Link can prevent browser navigation",
      component: (_, { action }) => (
        <Link
          onPress={e => {
            e.preventDefault();
            action("onPress")(e);
          }}
          url="https://thetimes.co.uk"
        >
          <BigSquare />
        </Link>
      )
    },
    {
      type: "story",
      name: "TextLink",
      component: (_, { action }) => (
        <TextLink onPress={action("onPress")} url="https://thetimes.co.uk/">
          The Times
        </TextLink>
      )
    },
    {
      type: "story",
      name: "TextLink with styles",
      component: (_, { action }) => (
        <TextLink
          onPress={action("onPress")}
          style={{ color: colours.functional.action }}
          url="https://thetimes.co.uk/"
        >
          The Times
        </TextLink>
      )
    }
  ]
};
