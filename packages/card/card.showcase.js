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
  children: [
    {
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
      ),
      name: "Default",
      type: "story"
    },
    {
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
      ),
      name: "Default - with placeholder",
      type: "story"
    },
    {
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
      ),
      name: "Default - no image",
      type: "story"
    },
    {
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
      ),
      name: "Default - reversed",
      type: "story"
    },
    {
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
      ),
      name: "Default - reversed with placeholder",
      type: "story"
    },
    {
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
      ),
      name: "Default - reversed, no image",
      type: "story"
    },
    {
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
      ),
      name: "Loading",
      type: "story"
    },
    {
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
      ),
      name: "Loading - no image",
      type: "story"
    },
    {
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
      ),
      name: "Loading - reversed",
      type: "story"
    },
    {
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
      ),
      name: "Loading - reversed, no image",
      type: "story"
    }
  ],
  name: "Composed/Card"
};
