/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import DatePublication from "../date-publication";

describe("Date Publication test", () => {
  const props = {
    date: "2017-07-01T14:32:00.000Z",
    publication: "TIMES"
  };

  it("renders a DatePublication component with Times publication and Relevant date", () => {
    const tree = renderer.create(<DatePublication {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a DatePublication component with Sunday Times publication and Relevant date", () => {
    const sundayTimesProps = {
      ...props,
      publication: "SUNDAYTIMES"
    };
    const tree = renderer
      .create(<DatePublication {...sundayTimesProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a DatePublication component with Sunday Times publication and Relevant (GMT) date", () => {
    const sundayTimesProps = {
      date: "2017-01-01T14:32:00.000Z",
      isGMT: true,
      publication: "SUNDAYTIMES"
    };
    const tree = renderer
      .create(<DatePublication {...sundayTimesProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
