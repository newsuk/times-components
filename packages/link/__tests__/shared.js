import React from "react";
import renderer from "react-test-renderer";

export default (Link, TextLink, Text) => {
  describe("Link", () => {
    it("renders correctly", () => {
      const tree = renderer
        .create(
          <Link onPress={() => {}} url="http://thetimes.co.uk">
            The Times
          </Link>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
    it("doesnt change inner text styles", () => {
      const tree = renderer
        .create(
          <Link onPress={() => {}} url="http://thetimes.co.uk">
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
            onPress={() => {}}
            style={{ backgroundColor: "blue" }}
            url="http://thetimes.co.uk"
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
            onPress={() => {}}
            style={[{ backgroundColor: "blue" }, { color: "red" }]}
            url="http://thetimes.co.uk"
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
          <TextLink onPress={() => {}} url="http://thetimes.co.uk">
            The Times
          </TextLink>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
};
