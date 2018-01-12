/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import DatePublication from "../date-publication";

function gmtTests(gmtOffset, isGMT) {
  const { getTimezoneOffset } = Date.prototype;

  beforeEach(() => {
    global.Date.prototype.getTimezoneOffset = jest
      .genMockFunction()
      .mockReturnValue(gmtOffset); // eslint-disable-line no-extend-native
  });

  afterEach(() => {
    global.Date.prototype.getTimezoneOffset = getTimezoneOffset; // eslint-disable-line no-extend-native
  });

  const props = {
    publication: "TIMES",
    isGMT
  };

  it("renders a DatePublication component with Times publication and Relevant date with (article) date in GMT", () => {
    const tree = renderer
      .create(<DatePublication {...props} date="2017-01-01T14:32:00.000Z" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a DatePublication component with Times publication and Relevant date with (article) date in BST", () => {
    const tree = renderer
      .create(
        <DatePublication
          {...props}
          date="2017-07-01T14:32:00.000Z"
          isDateGMT={false}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a DatePublication component with The Sunday Times publication and Relevant date with (article) date in BST", () => {
    props.publication = "SUNDAYTIMES";
    const tree = renderer
      .create(
        <DatePublication
          {...props}
          date="2017-07-01T14:32:00.000Z"
          isDateGMT={false}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a DatePublication component with default publication and Relevant date with (article) date in BST", () => {
    const removePubProps = props;
    delete removePubProps.publication;

    const tree = renderer
      .create(
        <DatePublication
          {...props}
          date="2017-07-01T14:32:00.000Z"
          isDateGMT={false}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
}

describe("when the user have the same timezone (UTC+0) as London timezone (UTC+0)", () => {
  gmtTests(0, true);
});

describe("when the user have a different timezone (UTC+2) than London timezone (UTC+0)", () => {
  gmtTests(120, true);
});

describe("when the user have a different timezone (UTC+0) than London timezone (UTC+1)", () => {
  gmtTests(0, false);
});
