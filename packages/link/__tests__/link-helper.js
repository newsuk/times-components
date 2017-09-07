/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";

export default Link => {
  it("renders correctly with specifc styles", () => {
    const tree = renderer
      .create(
        <Link url="http://thetimes.co.uk" style={{ backgroundColor: "blue" }}>
          The Times
        </Link>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with children", () => {
    const tree = renderer
      .create(<Link url="http://thetimes.co.uk">The Times</Link>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
