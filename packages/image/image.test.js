import "react-native";
import React from "react";
import Image from "./image";
import renderer from "react-test-renderer";

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
    getSize: (_, cb) => {
      cb(10, 20);
    },
    source: {
      uri: "http://example.com/image.jpg"
    }
  });

  comp.setState = ({ width, height }) => {
    expect(width).toEqual(20);
    expect(height).toEqual(40);

    done();
  };

  comp.handleLayout({ nativeEvent: { layout: { width: 20 } } });
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
