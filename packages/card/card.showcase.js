import React from "react";
import { Text, View } from "react-native";
import Card from "./src/card";
import { CardWrapper, ReversedCardWrapper } from "./card-wrapper";

const cardProps = {
  image: {
    uri:
      "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12"
  },
  imageRatio: 1.5,
  imageSize: 360
};

const childStyle = {
  borderColor: "black",
  borderStyle: "solid",
  borderWidth: 1,
  minHeight: 200
};

export default {
  name: "Composed/Card",
  children: [
    {
      type: "story",
      name: "Default",
      component: () => (
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
      )
    },
    {
      type: "story",
      name: "Default - with placeholder",
      component: () => (
        <CardWrapper>
          <Card
            {...cardProps}
            contentContainerClass="exampleCardContent"
            image={null}
            imageContainerClass="exampleCardImage"
            showImage
          >
            <View style={childStyle} />
          </Card>
        </CardWrapper>
      )
    },
    {
      type: "story",
      name: "Default - no image",
      component: () => (
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
      )
    },
    {
      type: "story",
      name: "Default - reversed",
      component: () => (
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
      )
    },
    {
      type: "story",
      name: "Default - reversed with placeholder",
      component: () => (
        <ReversedCardWrapper>
          <Card
            {...cardProps}
            contentContainerClass="exampleCardContent"
            image={null}
            imageContainerClass="exampleCardImage"
            isReversed
            showImage
          >
            <View style={childStyle} />
          </Card>
        </ReversedCardWrapper>
      )
    },
    {
      type: "story",
      name: "Default - reversed, no image",
      component: () => (
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
      )
    },
    {
      type: "story",
      name: "Loading",
      component: () => (
        <CardWrapper>
          <Card
            {...cardProps}
            contentContainerClass="exampleCardContent"
            imageContainerClass="exampleCardImage"
            isLoading
            showImage
          >
            <Text>Is loading</Text>
          </Card>
        </CardWrapper>
      )
    },
    {
      type: "story",
      name: "Loading - no image",
      component: () => (
        <CardWrapper>
          <Card
            {...cardProps}
            contentContainerClass="exampleCardContent"
            imageContainerClass="exampleCardImage"
            isLoading
            showImage={false}
          >
            <Text>Is loading</Text>
          </Card>
        </CardWrapper>
      )
    },
    {
      type: "story",
      name: "Loading - reversed",
      component: () => (
        <ReversedCardWrapper>
          <Card
            {...cardProps}
            contentContainerClass="exampleCardContent"
            imageContainerClass="exampleCardImage"
            isLoading
            isReversed
            showImage
          >
            <Text>Is loading</Text>
          </Card>
        </ReversedCardWrapper>
      )
    },
    {
      type: "story",
      name: "Loading - reversed, no image",
      component: () => (
        <ReversedCardWrapper>
          <Card
            {...cardProps}
            contentContainerClass="exampleCardContent"
            imageContainerClass="exampleCardImage"
            isLoading
            isReversed
            showImage={false}
          >
            <Text>Is loading</Text>
          </Card>
        </ReversedCardWrapper>
      )
    }
  ]
};
