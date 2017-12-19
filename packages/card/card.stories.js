import React from "react";
import { Text } from "react-native";
import { storiesOf } from "dextrose/storiesOfOverloader";
import { LateralSpacingDecorator } from "@times-components/storybook/decorators";
import ArticleSummary from "@times-components/article-summary";
import Card from "./card";
import articleSummaryProps from "./fixtures/article-summary-props.json";

const cardProps = {
  image: {
    uri:
      "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12"
  },
  imageRatio: 1.5,
  imageSize: 360,
  showImage: true
};

articleSummaryProps.date = new Date("2017-07-01T14:32:00.000Z");
storiesOf("Card", module)
  .addDecorator(LateralSpacingDecorator)
  .add("Loading", () => (
    <Card {...cardProps} isLoading>
      <Text>Is loading</Text>
    </Card>
  ))
  .add("Default", () => (
    <Card {...cardProps}>
      <ArticleSummary {...articleSummaryProps} />
    </Card>
  ))
  .add("Without Image", () => (
    <Card
      {...Object.assign({}, cardProps, {
        image: {
          url: null
        }
      })}
    >
      <ArticleSummary {...articleSummaryProps} />
    </Card>
  ));
