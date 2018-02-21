import React from "react";
import gql from "graphql-tag";
import {
  providerTester,
  getRenderedQueries
} from "@times-components/provider-test-tools";

import { delayAndAdvance } from "@times-components/utils/faketime";
import connect from "../connect";

function AuthorQueryResolver({ variables }) {
  return {
    data: {
      author: {
        name: variables.slug,
        __typename: "Author"
      }
    }
  };
}

const query = gql`
  query AuthorQuery($slug: Slug!) {
    author(slug: $slug) {
      name
    }
  }
`;

const Connected = connect(query);
const Debounced = props => <Connected {...props} debounceTimeMs={1000} />;

describe("provider execution order tests", () => {
  it("should resolve in order", async () => {
    const { link, setProps } = providerTester(AuthorQueryResolver, Debounced, {
      slug: "1"
    });

    await link.findByQuery("AuthorQuery", { slug: "1" }).resolve();
    await delayAndAdvance(0); // wait for render
    await setProps({ slug: "2" });
    await delayAndAdvance(500);
    await setProps({ slug: "3" });
    await delayAndAdvance(1000);

    expect(getRenderedQueries(link)).toMatchSnapshot();
  });

  it("should be able to be in isLoading and isDebouncing state simultaneously", async () => {
    const { link, setProps } = providerTester(AuthorQueryResolver, Debounced, {
      slug: "1"
    });

    await link.findByQuery("AuthorQuery", { slug: "1" }).resolve();
    await setProps({ slug: "2" });
    await delayAndAdvance(1000);

    expect(getRenderedQueries(link)).toMatchSnapshot();
  });
});
