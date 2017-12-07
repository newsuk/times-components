import React from "react";
import { storiesOf } from "@storybook/react-native";
import Card from "./card";
import props from "./fixtures/card-props.json";
import LateralSpacingDecorator from "../../storybook/decorators/lateral-spacing";

props.date = new Date("2017-07-01T14:32:00.000Z");
storiesOf("Card", module)
  .addDecorator(LateralSpacingDecorator)
  .add("Loading", () => <Card isLoading />)
  .add("Default", () => <Card {...props} />)
  .add("Without Image", () => (
    <Card
      {...Object.assign({}, props, {
        image: {
          url: null
        }
      })}
    />
  ));
