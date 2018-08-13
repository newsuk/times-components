import React from "react";
import TestRenderer from "react-test-renderer";
import Link, { TextLink } from "../src/link";

export default Text => [
  {
    name: "renders link",
    test() {
      const testInstance = TestRenderer.create(
        <Link onPress={() => {}} url="http://thetimes.co.uk">
          The Times
        </Link>
      );

      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "renders link with target",
    test() {
      const testInstance = TestRenderer.create(
        <Link onPress={() => {}} target="_blank" url="http://thetimes.co.uk">
          The Times
        </Link>
      );

      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "renders text link",
    test() {
      const testInstance = TestRenderer.create(
        <TextLink onPress={() => {}} url="http://thetimes.co.uk">
          The Times
        </TextLink>
      );

      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "text link with multiple styles",
    test() {
      const testInstance = TestRenderer.create(
        <TextLink
          onPress={() => {}}
          style={[{ backgroundColor: "blue" }, { color: "red" }]}
          url="http://thetimes.co.uk"
        >
          The Times
        </TextLink>
      );

      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "text link with children",
    test() {
      const testInstance = TestRenderer.create(
        <TextLink onPress={() => {}} url="http://thetimes.co.uk">
          <Text>The Times</Text>
        </TextLink>
      );

      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "text link with target",
    test() {
      const testInstance = TestRenderer.create(
        <TextLink
          onPress={() => {}}
          target="_blank"
          url="http://thetimes.co.uk"
        >
          <Text>The Times</Text>
        </TextLink>
      );

      expect(testInstance).toMatchSnapshot();
    }
  }
];
