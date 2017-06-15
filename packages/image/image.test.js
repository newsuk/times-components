import "react-native";
import React from "react";
import Image from "./image";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Image />).toJSON();

  expect(tree).toBeTruthy();
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
