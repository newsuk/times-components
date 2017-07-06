/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Image from "./image";

it("renders snapshot correctly", () => {
  const props = {
    source: {
      uri: "http://example.com/image.jpg"
    },
    width: 200,
    height: 75
  };
  const tree = renderer.create(<Image {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("lays out image with correct aspect ratio", done => {
  const comp = new Image({
    source: {
      uri: "http://httpstat.us/404"
    },
    aspectRatio: 0.5
  });

  comp.setState = ({ width, height }) => {
    expect(width).toEqual(20);
    expect(height).toEqual(10);

    return done();
  };

  comp.handleLayout({ nativeEvent: { layout: { width: 20 } } });
});

it("loads the correct url", () => {
  const props = {
    source: {
      uri: "http://httpstat.us/200"
    }
  };

  const comp = renderer.create(<Image {...props} />).toJSON();
  // Image is inside a View to handle resizing events
  const target = comp.children[0].props.source.uri;
  expect(target).toBe(props.source.uri);
});
