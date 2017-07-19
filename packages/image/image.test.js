/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import Image from "./image";
import placeholder from "./placeholder";

it("renders correctly with no dimensions and given URI", () => {
  const props = {
    source: {
      uri: "http://example.com/image.jpg"
    }
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

it("calculates width and height based on layout dimensions", done => {
  const comp = new Image({
    source: {
      uri: "http://httpstat.us/404"
    }
  });

  comp.setState = ({ width, height }) => {
    expect(width).toEqual(20);
    expect(height).toEqual(10);

    return done();
  };

  comp.state = {
    layout: {
      width: 20,
      height: 15
    }
  };

  comp.calculateDimensions({
    width: 40,
    height: 20
  });
});

it("calculates width and height based on image dimensions", done => {
  const comp = new Image({
    source: {
      uri: "http://httpstat.us/200"
    }
  });

  comp.setState = ({ width, height, layout }) => {
    expect(width).toEqual(20);
    expect(height).toEqual(10);
    expect(layout.width).toEqual(20);
    expect(layout.height).toEqual(15);

    return done();
  };

  comp.state = {
    width: 40,
    height: 20
  };

  comp.handleLayout({
    nativeEvent: {
      layout: {
        width: 20,
        height: 15
      }
    }
  });
});

it("ignores dimension if layout is 0", done => {
  const comp = new Image({
    source: {
      uri: "http://httpstat.us/200"
    }
  });

  comp.setState = ({ width, height, layout }) => {
    expect(width).toEqual(40);
    expect(height).toEqual(20);
    expect(layout).toEqual(undefined);

    return done();
  };

  comp.getSize = (uri, success) => success(40, 20);
  comp.handleLoad();
});
