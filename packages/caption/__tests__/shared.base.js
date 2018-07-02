import React from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import Caption from "../src/caption";

const captionText = "Some caption text goes in here";
const credits = "Just credits";

export default () => {
  it("renders without credits", () => {
    const testInstance = TestRenderer.create(<Caption text={captionText} />);

    expect(testInstance.toJSON()).toMatchSnapshot("1. renders without credits");
  });

  it("renders with credits", () => {
    const testInstance = TestRenderer.create(
      <Caption text={captionText} credits={credits} />
    );

    expect(testInstance.toJSON()).toMatchSnapshot("2. renders with credits");
  });

  it("renders with credits only", () => {
    const testInstance = TestRenderer.create(<Caption credits={credits} />);

    expect(testInstance.toJSON()).toMatchSnapshot(
      "3. renders with credits only"
    );
  });

  it("renders a child", () => {
    const testInstance = TestRenderer.create(
      <Caption text={captionText} credits={credits}>
        <Text>Hello world!</Text>
      </Caption>
    );

    expect(testInstance.toJSON()).toMatchSnapshot("4. renders a child");
  });
};
