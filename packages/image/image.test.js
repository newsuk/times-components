/* eslint-env jest */

import { shallow } from "enzyme";
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
    },
    aspectRatio: 0.5
  });

  comp.setState = ({ source }) => {
    expect(source.uri).toEqual(placeholder);

    return done();
  };

  comp.handleError();
});

it("lays out the image with the correct aspect ratio", done => {
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

  comp.setState = testSetState(20, 15, done);
  comp._handleLayout({ nativeEvent: { layout: { width: 20 } } });
});

it("sets the expected dimensions for a given state", () => {
  const props = {
    source: {
      uri: "http://example.com/image.jpg"
    }
  };

  const wrapper = shallow(<Image {...props} />);

  wrapper.setState({
    height: 300,
    width: 100
  });

  expect(wrapper).toMatchSnapshot();
});
