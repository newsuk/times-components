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
import { getTitle } from "../../src/key-facts-text";
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
      component: "ArticleSkeleton",
      attrs: {
        component_type: "in-article component: key moments: interactive",
        component_name: "Example title",
        section_details: "section : news",
        event_navigation_name: "in-article component displayed : key moments",
        event_navigation_action: "navigation",
        event_navigation_browsing_method: "scroll",
        article_name: "some headline",
        other_details: "breaking",
        eventTime: "2021-05-03T00:00:00.000Z"
      },
      action: "Scrolled",
      object: "KeyMoments"
    });

    expect(analyticsStream.mock.calls[1][0]).toEqual({
      component: "ArticleSkeleton",
      attrs: {
        component_type: "in-article component: key moments: interactive",
        component_name: "Example title",
        section_details: "section : news",
        event_navigation_name: "in-article component clicked : key moments",
        event_navigation_action: "navigation",
        event_navigation_browsing_method: "click",
        article_parent_name: "a link title",
        article_name: "some headline",
        other_details: "breaking",
        eventTime: "2021-05-03T00:00:00.000Z"
      },
      action: "Clicked",
      object: "KeyMoments"
    });
  });

  describe("getTitle()", () => {
    const linkDataChildren = {
      name: "text",
      attributes: {
        value: "a link title"
      },
      children: []
    };

    it("should return a concatenated string when there is more than 1 child element", () => {
      expect(
        getTitle({ children: [linkDataChildren, linkDataChildren] })
      ).toEqual("a link title a link title");
    });

    it("should return immediately when there is only 1 child element", () => {
      expect(getTitle({ children: [linkDataChildren] })).toEqual(
        "a link title"
      );
    });
  });
});
