import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/utils";
import { addTypenameToDocument } from "apollo-utilities";
import fixture from "@times-components/provider-test-tools/fixtures/topic.json";
import { TopicProvider } from "../src/provider";
import { query as topicQuery } from "../src/topic";

const mocks = [
  {
    request: {
      query: addTypenameToDocument(topicQuery),
      variables: {
        slug: "animals",
        imageRatio: "3:2"
      }
    },
    result: fixture
  }
];

const renderComponent = child =>
  renderer.create(
    <MockedProvider mocks={mocks}>
      <TopicProvider slug="animals" imageRatio="3:2" debounceTimeMs={0}>
        {child}
      </TopicProvider>
    </MockedProvider>
  );

describe("TopicProvider", () => {
  it("returns query result", done => {
    renderComponent(({ isLoading, topic }) => {
      if (!isLoading) {
        expect(topic).toMatchSnapshot();
        done();
      }

      return null;
    });
  });
});
