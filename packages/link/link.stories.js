import { View } from "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
import Link, { TextLink } from "./link";

// eslint-disable-next-line react/prop-types
const Centered = ({ children }) => (
  <View
    style={{
      flex: 1,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    {children}
  </View>
);

const BigPinkSquare = props => (
  <View
    style={{ width: 100, height: 100, backgroundColor: "pink" }}
    {...props}
  />
);

storiesOf("Link", module)
  .addDecorator(story => <Centered>{story()}</Centered>)
  .add("Link with big content", () => (
    <Link url="https://thetimes.co.uk" onPress={action("onPress")}>
      <View style={{ width: 100, height: 100, backgroundColor: "pink" }} />
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
      <BigPinkSquare />
    </Link>
  ))
  .add("TextLink", () => (
    <TextLink url="https://thetimes.co.uk/" onPress={action("onPress")}>
      The Times
    </TextLink>
  ))
  .add("TextLink with styles", () => (
    <TextLink
      style={{ color: "red" }}
      url="https://thetimes.co.uk/"
      onPress={action("onPress")}
    >
      The Times
    </TextLink>
  ));
