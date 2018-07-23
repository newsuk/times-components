import React from "react";
import mockDate from "mockdate";
import { shallow } from "enzyme";
import { iterator } from "@times-components/test-utils";
import ArticleTopics from "../src/article-topics";
import ArticleTopic from "../src/article-topic";
import topicData from "../fixtures/topics";

module.exports = () => {
  beforeEach(() => {
    mockDate.set(1514764800000, 0);
  });

  afterEach(() => {
    mockDate.reset();
  });

  const tests = [
    {
      name: "group of topics",
      test: () => {
        const wrapper = shallow(
          <ArticleTopics onPress={() => {}} topics={topicData} />
        );

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "single topic",
      test: () => {
        const wrapper = shallow(
          <ArticleTopic
            name={topicData[0].name}
            onPress={() => {}}
            slug={topicData[0].slug}
          />
        ).dive();

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "onPress handler is working",
      test: () => {
        const onPress = (e, { name, slug }) => {
          expect(e).toBe("event");
          expect(slug).toBe(slug);
          expect(name).toBe(name);
        };

        shallow(
          <ArticleTopic
            name={topicData[0].name}
            onPress={(e, data) => onPress(e, data)}
            slug={topicData[0].slug}
          />
        )
          .dive()
          .simulate("press", "event");
      }
    },
    {
      name: "onPress sends analytics",
      test: () => {
        const events = jest.fn();

        const context = {
          tracking: {
            analytics: events
          }
        };

        shallow(
          <ArticleTopic
            name={topicData[0].name}
            onPress={() => events}
            slug={topicData[0].slug}
          />,
          {
            context
          }
        ).simulate("press");

        expect(events.mock.calls).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
