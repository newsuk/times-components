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
        <Link url="https://thetimes.co.uk" onPress={action("onPress")}>
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
          url="https://thetimes.co.uk"
          onPress={e => {
            e.preventDefault();
            action("onPress")(e);
          }}
        >
          <BigSquare />
        </Link>
      )
    },
    {
      type: "story",
      name: "TextLink",
      component: (_, { action }) => (
        <TextLink url="https://thetimes.co.uk/" onPress={action("onPress")}>
          The Times
        </TextLink>
      )
    },
    {
      type: "story",
      name: "TextLink with styles",
      component: (_, { action }) => (
        <TextLink
          style={{ color: colours.functional.action }}
          url="https://thetimes.co.uk/"
          onPress={action("onPress")}
        >
          The Times
        </TextLink>
      )
    }
  ]
};
