import React from "react";
import { iterator } from "@times-components/test-utils";
import Context from "@times-components/context";
import Flags from "../src/article-flags/article-flags";
import Label from "../src/article-label/article-label";
import Meta from "../src/article-meta/article-meta";
import Standfirst from "../src/article-standfirst/article-standfirst";

import { bylineWithLink } from "../fixtures/full-article";

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
  },
  {
    name: "article label uses default section colour",
    test() {
      const output = renderComponent(
        <Context.Provider
          value={{
            theme: { sectionColour: null }
          }}
        >
          <Label label="Random Label" />
        </Context.Provider>
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "article label renders null if there is no text",
    test() {
      const output = renderComponent(<Label />);

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "article meta uses default section colour",
    test() {
      const output = renderComponent(
        <Context.Provider
          value={{
            theme: { sectionColour: null }
          }}
        >
          <Meta
            byline={bylineWithLink()}
            onAuthorPress={() => {}}
            publicationName="TIMES"
            publishedTime="2015-03-23T19:39:39.000Z"
          />
        </Context.Provider>
      );

      expect(output).toMatchSnapshot();
    }
  }
];

export default (renderComponent, platformTests = []) => {
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

  iterator([...snapshotTests(renderComponent), ...platformTests]);
};
