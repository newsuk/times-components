/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";
import Card from "../../card";
import props from "../../fixtures/card-props.json";

describe("Card test on web", () => {
  props.date = new Date("2017-07-01T14:32:00.000Z");

  it("renders", () => {
    const tree = renderer.create(<Card {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders loading state", () => {
    const tree = renderer.create(<Card {...props} isLoading />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders without image", () => {
    const noImageProps = Object.assign({}, props, {
      image: null
    });
    const tree = renderer.create(<Card {...noImageProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders without image url", () => {
    const noImageProps = Object.assign({}, props, {
      image: {
        uri: null
      }
    });
    const tree = renderer.create(<Card {...noImageProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
