/* eslint-disable react/no-danger */
import React from "react";
import ReactDOMServer from "react-dom/server";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import Image from "./image";

const squareUri =
  "https://feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400";
const SquareImage = props => (
  <Image uri={squareUri} aspectRatio={1 / 1} {...props} />
);

storiesOf("Image", module).add("Server side rendered Image (web only)", () => {
  const markup = {
    __html: ReactDOMServer.renderToStaticMarkup(
      <View>
        <SquareImage
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            overflow: "hidden"
          }}
        />
        <SquareImage
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            overflow: "hidden"
          }}
        />
        <SquareImage
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            overflow: "hidden"
          }}
        />
      </View>
    )
  };

  return <div dangerouslySetInnerHTML={markup} />;
});
