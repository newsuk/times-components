import React from "react";
import gql from "graphql-tag";
import {
  providerTester,
  getRenderedQueries
} from "@times-components/provider-test-tools";
import connect from "../connect";

jest.useFakeTimers();

// Alias the confusingly misnamed runTimersToTime to advanceTimersByTime
// Jest has done this in v22, so this can be removed if we upgrade
jest.advanceTimersByTime = jest.runTimersToTime;

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

const wait = ms => {
  const timer = new Promise(done => setTimeout(done));
  jest.advanceTimersByTime(ms);
  return timer;
};

describe("provider execution order tests", () => {
  it("should resolve in order", async () => {
    const { link, setProps } = providerTester(AuthorQueryResolver, Debounced, {
      slug: "1"
    });

    await link.findByQuery("AuthorQuery", { slug: "1" }).resolve();
    await wait(0); // wait for render
    await setProps({ slug: "2" });
    await wait(500);
    await setProps({ slug: "3" });
    await wait(1000);

    expect(getRenderedQueries(link)).toMatchSnapshot();
  });

  it("should be able to be in isLoading and isDebouncing state simultaneously", async () => {
    const { link, setProps } = providerTester(AuthorQueryResolver, Debounced, {
      slug: "1"
    });

    await link.findByQuery("AuthorQuery", { slug: "1" }).resolve();
    await setProps({ slug: "2" });
    await wait(1000);

    expect(getRenderedQueries(link)).toMatchSnapshot();
  });

  it.skip("should not render old resolved query while debounce", async () => {
    const { link, setProps } = providerTester(AuthorQueryResolver, Debounced, {
      slug: "1"
    });

    await wait(0);
    await setProps({ slug: "2" });
    await wait(500);
    await link.findByQuery("AuthorQuery", { slug: "1" }).resolve();
    await wait(1000);

    expect(getRenderedQueries(link)).toMatchSnapshot();
  });
});
