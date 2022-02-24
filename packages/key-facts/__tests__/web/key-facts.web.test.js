/* eslint-env browser */
import React from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  enzymeTreeSerializer
} from "@times-components/jest-serializer";
import {
  TrackingContextProvider,
  MockIntersectionObserver
} from "@times-components/ts-components";
import mockDate from "mockdate";
import KeyFacts from "../../src/key-facts";
import data from "../../fixtures/key-facts-test.json";
import dataNoTitle from "../../fixtures/key-facts-no-title-test.json";

addSerializers(expect, enzymeTreeSerializer());
const analyticsStream = jest.fn();

const props = {
  headline: "some headline",
  section: "news",
  ast: data,
  analyticsStream
};

describe("Key moments", () => {
  let oldIntersectionObserver;

  beforeEach(() => {
    mockDate.set(1620000000000);
    oldIntersectionObserver = window.IntersectionObserver;

    window.IntersectionObserver = MockIntersectionObserver;
  });

  afterEach(() => {
    mockDate.reset();
    window.IntersectionObserver = oldIntersectionObserver;

    jest.resetAllMocks();
  });

  it("should fire analytics when component comes into view", () => {
    mount(
      <TrackingContextProvider
        context={{
          component: "ArticleSkeleton",
          attrs: {}
        }}
        analyticsStream={analyticsStream}
      >
        <KeyFacts {...props} />
      </TrackingContextProvider>
    );

    MockIntersectionObserver.intersect();

    expect(analyticsStream).toHaveBeenCalledTimes(1);
    expect(analyticsStream).toHaveBeenCalledWith({
      action: "Scrolled",

      component: "ArticleSkeleton",
      object: "Key moments",
      attrs: {
        article_parent_name: "some headline",
        component_name: "Example title",
        component_type: "In-article component: key moments: static",
        event_navigation_browsing_method: "scroll",
        eventTime: "2021-05-03T00:00:00.000Z",
        section_details: "news"
      }
    });
  });

  it("should render with title", () => {
    const wrapper = mount(
      <TrackingContextProvider
        context={{
          component: "ArticleSkeleton",
          attrs: {}
        }}
        analyticsStream={analyticsStream}
      >
        <KeyFacts {...props} />
      </TrackingContextProvider>
    );

    expect(wrapper.find("Example title"));
  });

  it("should render without title", () => {
    const wrapper = mount(
      <TrackingContextProvider
        context={{
          component: "ArticleSkeleton",
          attrs: {}
        }}
        analyticsStream={analyticsStream}
      >
        <KeyFacts {...props} ast={dataNoTitle} />
      </TrackingContextProvider>
    );

    expect(wrapper.find("Example title"));
  });

  //  it('', () => {})
});
