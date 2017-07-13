/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import Image from "./image";
import placeholder from "./placeholder";

it("renders correctly with no dimensions and given URI", () => {
  const props = {
    source: {
      uri: "http://example.com/image.jpg"
    },
    aspectRatio: 3 / 2
  };
  const tree = renderer.create(<Image {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("use placeholder image when image is not reachable", done => {
  const comp = new Image({
    source: {
      uri: "http://httpstat.us/404"
    }
  });

  comp.setState = ({ source }) => {
    expect(source.uri).toEqual(placeholder);

    return done();
  };

  comp.handleError();
});
