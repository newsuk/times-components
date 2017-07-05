import "react-native";
import React from "react";
import Image from "./image";
import renderer from "react-test-renderer";

function testSetState(width, height, done) {
  return ({ width, height }) => {
    expect(width).toEqual(width);
    expect(height).toEqual(height);

    return done();
  };
}

it("renders snapshot correctly", () => {
  const props = {
    source: {
      uri: "http://example.com/image.jpg"
    },
    style: {
      width: 200,
      height: 75
    }
  };
  const tree = renderer.create(<Image {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("lays out image with correct aspect ratio", done => {
  const comp = new Image({
    getSize: (uri, cb) => {
      expect(uri).toEqual("http://example.com/image.jpg");
      return cb(10, 20);
    },
    source: {
      uri: "http://example.com/image.jpg"
    }
  });

  comp.setState = testSetState(20, 40, done);
  comp._handleLayout({ nativeEvent: { layout: { width: 20 } } });
});

it("use empty string as default source", done => {
  const comp = new Image({
    getSize: (_, cb) => {
      return cb();
    }
  });

  comp.setState = testSetState(20, 15, done);
  comp._handleLayout({ nativeEvent: { layout: { width: 20 } } });
});

it("use default image when get size fails", done => {
  const comp = new Image({
    getSize: (_, cb) => {
      return cb();
    },
    source: {
      uri: "http://example.com/image.jpg"
    }
  });

  comp.setState = testSetState(20, 15, done);
  comp._handleLayout({ nativeEvent: { layout: { width: 20 } } });
});

it("loads the correct url", () => {
  const props = {
    source: {
      uri: "http://example.com/image.jpg"
    }
  };
  const comp = renderer.create(<Image {...props} />).toJSON();
  //Image is inside a View to handle resizing events
  const target = comp.children[0].props.source.uri;
  expect(target).toBe(props.source.uri);
});
