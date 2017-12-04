/* eslint-disable react/no-danger */
import React from "react";
import ReactDOMServer from "react-dom/server";
import { storiesOf } from "@storybook/react-native";
import Card from "./card";
import props from "./fixtures/card-props.json";
import LateralSpacingDecorator from "../../storybook/decorators/lateral-spacing";

props.date = new Date("2017-07-01T14:32:00.000Z");
storiesOf("Card", module)
  .addDecorator(LateralSpacingDecorator)
  .add("Static rendering (web only)", () => {
    const markup = {
      __html: ReactDOMServer.renderToStaticMarkup(<Card {...props} />)
    };

    return <div dangerouslySetInnerHTML={markup} />;
  });
