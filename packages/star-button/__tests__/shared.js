import React from "react";
import TestRenderer from "react-test-renderer";
import StarButton from "../src/star-button";

jest.mock("@times-components/icons", () => ({
  IconStar: "IconStar"
}));

export default () => {
  it("renders default", () => {
    const testInstance = TestRenderer.create(<StarButton onPress={() => {}} />);

    expect(testInstance.toJSON()).toMatchSnapshot();
  });

  it("renders selected", () => {
    const testInstance = TestRenderer.create(
      <StarButton onPress={() => {}} starState="selected" />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });

  it("renders disabled", () => {
    const testInstance = TestRenderer.create(
      <StarButton onPress={() => {}} starState="disabled" />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
