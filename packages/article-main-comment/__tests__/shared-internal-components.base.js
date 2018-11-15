import React from "react";
import { iterator } from "@times-components/test-utils";

import Flags from "../src/article-flags/article-flags";
import Standfirst from "../src/article-standfirst/article-standfirst";

const snapshotTests = renderComponent => [
  {
    name: "article flags with content",
    test() {
      const output = renderComponent(<Flags flags={["NEW"]} />);

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "article flags with no content",
    test() {
      const output = renderComponent(<Flags flags={[]} />);

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "article standfirst with content",
    test() {
      const output = renderComponent(
        <Standfirst standfirst="This is a standfirst" />
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "article standfirst with no content",
    test() {
      const output = renderComponent(<Standfirst />);

      expect(output).toMatchSnapshot();
    }
  }
];

export default renderComponent => {
  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  iterator([...snapshotTests(renderComponent)]);
};
