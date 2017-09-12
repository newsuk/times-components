/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Image from "@times-components/image";
import Caption from "../caption";

const captionText = "Some caption text goes in here";
const credits = "Just credits";
const exampleImage = {
  uri:
    "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12&resize=320"
};
const style = {
  container: {
    backgroundColor: "red"
  },
  text: {
    color: "green"
  }
};

module.exports = () => {
  it("renders correctly without credits", () => {
    const tree = renderer.create(<Caption text={captionText} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with credits", () => {
    const tree = renderer
      .create(<Caption text={captionText} credits={credits} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with credits only", () => {
    const tree = renderer.create(<Caption credits={credits} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with specific styles", () => {
    const tree = renderer
      .create(<Caption text={captionText} credits={credits} style={style} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an image with a caption", () => {
    const tree = renderer
      .create(
        <Caption text={captionText} credits={credits}>
          <Image source={exampleImage} />
        </Caption>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
