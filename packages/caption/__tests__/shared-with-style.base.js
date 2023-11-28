import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";

import Caption from "../src/caption";

const captionText = "Some caption text goes in here";
const credits = "Just credits";
const style = {
  container: {
    backgroundColor: "red"
  },
  text: {
    color: "green"
  }
};

const allStyleOptions = {
  caption: {
    fontSize: 10
  },
  container: {
    backgroundColor: "red"
  },
  credits: {
    fontSize: 8
  },
  text: {
    color: "green"
  }
};

const containerOnlyStyle = {
  container: {
    backgroundColor: "blue"
  }
};

export default () => {
  iterator([
    {
      name: "caption with container and text styles",
      test() {
        const testInstance = TestRenderer.create(
          <Caption credits={credits} style={style} text={captionText} />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "caption with container, caption, and credit styles",
      test() {
        const testInstance = TestRenderer.create(
          <Caption
            credits={credits}
            style={allStyleOptions}
            text={captionText}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "caption with only container styles",
      test() {
        const testInstance = TestRenderer.create(
          <Caption
            credits={credits}
            style={containerOnlyStyle}
            text={captionText}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    }
  ]);
};
