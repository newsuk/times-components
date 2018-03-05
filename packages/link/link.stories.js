import { View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { CenteredDecorator } from "@times-components/storybook";
import { colours } from "@times-components/styleguide";
import Link, { TextLink } from "./link";

const BigGreySquare = props => (
  <View
    style={{
      width: 100,
      height: 100,
      backgroundColor: colours.functional.gradientEnd
    }}
    {...props}
  />
);

storiesOf("Primitives/Link", module)
  .addDecorator(CenteredDecorator)
  .add("Link with big content", () => (
    <Link url="https://thetimes.co.uk" onPress={action("onPress")}>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: colours.functional.gradientEnd
        }}
      />
    </Link>
  ))
  .add("Link can prevent browser navigation", () => (
    <Link
      url="https://thetimes.co.uk"
      onPress={e => {
        e.preventDefault();
        action("onPress")(e);
      }}
    >
      <BigGreySquare />
    </Link>
  ))
  .add("TextLink", () => (
    <TextLink url="https://thetimes.co.uk/" onPress={action("onPress")}>
      The Times
    </TextLink>
  ))
  .add("TextLink with styles", () => (
    <TextLink
      style={{ color: colours.functional.cta }}
      url="https://thetimes.co.uk/"
      onPress={action("onPress")}
    >
      The Times
    </TextLink>
  ));
