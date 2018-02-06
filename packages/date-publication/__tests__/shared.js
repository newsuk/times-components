import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import DatePublication from "../date-publication";

export default function() {
  it("renders a DatePublication component with Times publication and relevant GMT date", () => {
    const tree = renderer
      .create(
        <DatePublication date="2017-01-01T14:32:00.000Z" publication="TIMES" />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a DatePublication component with default publication and relevant GMT date", () => {
    const tree = renderer
      .create(<DatePublication date="2017-01-01T14:32:00.000Z" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a DatePublication component with default publication and relevant BST date", () => {
    const tree = renderer
      .create(<DatePublication date="2017-07-01T14:32:00.000Z" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
}
