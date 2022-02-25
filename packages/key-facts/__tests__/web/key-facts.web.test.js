/* eslint-env browser */
import React from "react";
import { shallow, mount } from "enzyme";
import {
  addSerializers,
  enzymeTreeSerializer
} from "@times-components/jest-serializer";
import { TrackingContextProvider } from "@times-components/ts-components";
import mockDate from "mockdate";
import KeyFacts from "../../src/key-facts";
import { KeyFactTextLink } from "../../src/styles";
import data from "../../fixtures/key-facts-test.json";
import dataNoTitle from "../../fixtures/key-facts-no-title-test.json";

addSerializers(expect, enzymeTreeSerializer());
const analyticsStream = jest.fn();

const props = {
  headline: "some headline",
  section: "news",
  ast: data,
  isLiveOrBreaking: "breaking",
  analyticsStream
};

class FakeIntersectionObserver {
  static observe = jest.fn();

  static disconnect = jest.fn();

  static intersect(isIntersecting = true) {
    FakeIntersectionObserver.callback([{ isIntersecting }]);
  }

  observe = FakeIntersectionObserver.observe;

  disconnect = FakeIntersectionObserver.disconnect;

  constructor(callback) {
    FakeIntersectionObserver.callback = callback;
  }
}

describe("Key moments", () => {
  let oldIntersectionObserver;

  beforeEach(() => {
    mockDate.set(1620000000000);
    oldIntersectionObserver = window.IntersectionObserver;

    window.IntersectionObserver = FakeIntersectionObserver;
  });

  afterEach(() => {
    mockDate.reset();
    window.IntersectionObserver = oldIntersectionObserver;

    jest.resetAllMocks();
  });

  it("should render with title", () => {
    const wrapper = shallow(
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
    const wrapper = shallow(
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

  it("should fire analytics when the component comes into view and a link is clicked", () => {
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

    FakeIntersectionObserver.intersect();

    wrapper
      .find(KeyFactTextLink)
      .first()
      .simulate("click");

    expect(analyticsStream).toHaveBeenCalledTimes(2);

    expect(analyticsStream.mock.calls[0][0]).toEqual({
      action: "Scrolled",
      component: "ArticleSkeleton",
      object: "Key moments",
      attrs: {
        article_parent_name: "some headline",
        component_name: "Example title",
        component_type: "In-article component: key moments: static",
        event_navigation_browsing_method: "scroll",
        eventTime: "2021-05-03T00:00:00.000Z",
        section_details: "news",
        other_details: "breaking"
      }
    });

    expect(analyticsStream.mock.calls[1][0]).toEqual({
      action: "Clicked",
      component: "ArticleSkeleton",
      object: "Key moments",
      attrs: {
        article_parent_name: "some headline",
        component_name: "Example title",
        component_type: "In-article component: key moments: static",
        event_navigation_browsing_method: "click",
        eventTime: "2021-05-03T00:00:00.000Z",
        section_details: "news",
        other_details: "breaking"
      }
    });
  });
});
