/* eslint-disable react/no-danger */
import React from "react";
import { View } from "react-native";
import { storiesOf } from "dextrose/storiesOfOverloader";
import Image from "./image";
import { activatePreviewImage } from "./activatePreviewImage";

const squareUri =
  "https://feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400";
const SquareImage = props => (
  <Image uri={squareUri} aspectRatio={1 / 1} {...props} />
);
const SquareImageWithPreview = activatePreviewImage(SquareImage)

storiesOf("Image", module).add("With Preview Image (native only)", () => (
  <SquareImageWithPreview />
));
