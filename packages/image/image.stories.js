import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react";
import Image from "./image";

const exampleImage = {
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
};

storiesOf("Image", module)
  .add("Image", () => <Image source={exampleImage} />);
