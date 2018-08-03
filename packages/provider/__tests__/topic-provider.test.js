import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/provider-test-tools";
import { addTypenameToDocument } from "apollo-utilities";
import { topic as topicQuery } from "@times-components/provider-queries";
import fixture from "@times-components/provider-test-tools/fixtures/topic.json";
import { TopicProvider } from "../src/provider";

const mocks = [
  {
    request: {
      query: addTypenameToDocument(topicQuery),
      variables: {
        slug: "chelsea"
      }
    },
    result: fixture
  }
];

const renderComponent = child =>
  renderer.create(
    <MockedProvider mocks={mocks}>
      <TopicProvider debounceTimeMs={0} slug="chelsea">
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
