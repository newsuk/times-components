import React from "react";
import { Text, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { boolean } from "@storybook/addon-knobs/react";
import withResponsiveStyles from "@times-components/responsive-styles";
import Card from "./card";

const cardProps = {
  image: {
    uri:
      "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12"
  },
  imageRatio: 1.5,
  imageSize: 360
};

const CardWrapper = withResponsiveStyles(View, {
  mediumUp: () => `
    .exampleCardImage {
      flex-grow: 2 !important;
      margin-bottom: 0;
      min-width: 360px;
      padding-right: 15px;
    }
    .exampleCardContent {
      flex-grow: 2.7 !important;
      min-width: 380px;
    }
  `
});

storiesOf("Composed/Card", module)
  .add("Loading", () => (
    <CardWrapper>
      <Card
        {...cardProps}
        contentContainerClass="exampleCardContent"
        imageContainerClass="exampleCardImage"
        isLoading
        showImage={boolean("Show Image?", true, "")}
      >
        <Text>Is loading</Text>
      </Card>
    </CardWrapper>
  ))
  .add("Default", () => (
    <CardWrapper>
      <Card
        {...cardProps}
        contentContainerClass="exampleCardContent"
        imageContainerClass="exampleCardImage"
        showImage={boolean("Show Image?", true, "")}
      >
        <View
          style={{
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: 1,
            minHeight: 200
          }}
        />
      </Card>
    </CardWrapper>
  ));
