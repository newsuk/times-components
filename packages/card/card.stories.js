import React from "react";
import { Text, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import Card from "./src/card";

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

const ReversedCardWrapper = withResponsiveStyles(View, {
  mediumUp: () => `
    .exampleCardImage {
      flex-grow: 2 !important;
      margin-bottom: 0;
      min-width: 360px;
      padding-left: 15px;
    }
    .exampleCardContent {
      flex-grow: 2.7 !important;
      min-width: 380px;
    }
  `
});

const childStyle = {
  borderColor: "black",
  borderStyle: "solid",
  borderWidth: 1,
  minHeight: 200
};

storiesOf("Composed/Card", module)
  .add("Loading", () => (
    <CardWrapper>
      <Card
        {...cardProps}
        contentContainerClass="exampleCardContent"
        imageContainerClass="exampleCardImage"
        showImage
        isLoading
      >
        <Text>Is loading</Text>
      </Card>
    </CardWrapper>
  ))
  .add("Loading - no image", () => (
    <CardWrapper>
      <Card
        {...cardProps}
        contentContainerClass="exampleCardContent"
        imageContainerClass="exampleCardImage"
        showImage={false}
        isLoading
      >
        <Text>Is loading</Text>
      </Card>
    </CardWrapper>
  ))
  .add("Loading - reversed", () => (
    <ReversedCardWrapper>
      <Card
        {...cardProps}
        contentContainerClass="exampleCardContent"
        imageContainerClass="exampleCardImage"
        showImage
        isLoading
        isReversed
      >
        <Text>Is loading</Text>
      </Card>
    </ReversedCardWrapper>
  ))
  .add("Loading - reversed, no image", () => (
    <ReversedCardWrapper>
      <Card
        {...cardProps}
        contentContainerClass="exampleCardContent"
        imageContainerClass="exampleCardImage"
        showImage={false}
        isLoading
        isReversed
      >
        <Text>Is loading</Text>
      </Card>
    </ReversedCardWrapper>
  ))
  .add("Default", () => (
    <CardWrapper>
      <Card
        {...cardProps}
        contentContainerClass="exampleCardContent"
        imageContainerClass="exampleCardImage"
        showImage
      >
        <View style={childStyle} />
      </Card>
    </CardWrapper>
  ))
  .add("Default - no image", () => (
    <CardWrapper>
      <Card
        {...cardProps}
        contentContainerClass="exampleCardContent"
        imageContainerClass="exampleCardImage"
        showImage={false}
      >
        <View style={childStyle} />
      </Card>
    </CardWrapper>
  ))
  .add("Default - reversed", () => (
    <ReversedCardWrapper>
      <Card
        {...cardProps}
        contentContainerClass="exampleCardContent"
        imageContainerClass="exampleCardImage"
        isReversed
        showImage
      >
        <View style={childStyle} />
      </Card>
    </ReversedCardWrapper>
  ))
  .add("Default - reversed, no image", () => (
    <ReversedCardWrapper>
      <Card
        {...cardProps}
        contentContainerClass="exampleCardContent"
        imageContainerClass="exampleCardImage"
        isReversed
        showImage={false}
      >
        <View style={childStyle} />
      </Card>
    </ReversedCardWrapper>
  ));
