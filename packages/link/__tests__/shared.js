/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";

export default (Link, TextLink, Text) => {
  describe("Link", () => {
    it("renders correctly", () => {
      const tree = renderer
        .create(
          <Link url="http://thetimes.co.uk" onPress={() => {}}>
            The Times
          </Link>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
    it("doesnt change inner text styles", () => {
      const tree = renderer
        .create(
          <Link url="http://thetimes.co.uk" onPress={() => {}}>
            <Text>Hello</Text>
          </Link>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe("TextLink", () => {
    it("renders correctly with specific styles", () => {
      const tree = renderer
        .create(
          <TextLink
            url="http://thetimes.co.uk"
            onPress={() => {}}
            style={{ backgroundColor: "blue" }}
          >
            The Times
          </TextLink>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it("renders correctly with multiple styles", () => {
      const tree = renderer
        .create(
          <TextLink
            url="http://thetimes.co.uk"
            onPress={() => {}}
            style={[{ backgroundColor: "blue" }, { color: "red" }]}
          >
            The Times
          </TextLink>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it("renders correctly with children", () => {
      const tree = renderer
        .create(
          <TextLink url="http://thetimes.co.uk" onPress={() => {}}>
            The Times
          </TextLink>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
};
