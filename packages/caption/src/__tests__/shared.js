import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Image from "@times-components/image";
import Caption from "../caption";

const captionText = "Some caption text goes in here";
const credits = "Just credits";
const exampleImage =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F7d2fd06c-a460-11e7-8955-1ad2a9a7928d.jpg?crop=1500%2C844%2C0%2C78&resize=685";
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
          <Image uri={exampleImage} aspectRatio={16 / 9} />
        </Caption>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
