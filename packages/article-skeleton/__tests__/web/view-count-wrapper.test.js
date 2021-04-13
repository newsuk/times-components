import React from "react";
import { create } from "react-test-renderer";
import { delay } from "@times-components/test-utils";

import ViewCountWrapper from "../../src/article-body/view-count-wrapper";

describe("<ViewCountWrapper>", () => {
  beforeEach(() => {
    if (typeof window !== "undefined")
      window.document.cookie = "nuk-consent-personalisation=1";
  });

  afterEach(() => {
    if (typeof window !== "undefined")
      window.document.cookie = "nuk-consent-personalisation=;max-age=0";
  });
  describe("display function", () => {
    it("always renders", () => {
      const component = create(
        <ViewCountWrapper trackingName="hello1">
          <span>Hello</span>
        </ViewCountWrapper>
      );
      expect(component.root.findAllByType("span").length).toEqual(1);
      expect(component).toMatchSnapshot();
    });

    it("doesnt render without consent", () => {
      window.document.cookie = "nuk-consent-personalisation=;max-age=0";

      const component = create(
        <ViewCountWrapper trackingName="hello1">
          <span>Hello</span>
        </ViewCountWrapper>
      );
      expect(component.root.findAllByType("span").length).toEqual(0);
      expect(component).toMatchSnapshot();
    });
    it("never renders", () => {
      const component = create(
        <ViewCountWrapper trackingName="hello1" displayFunction={() => false}>
          <span>Hello</span>
        </ViewCountWrapper>
      );
      expect(component.root.findAllByType("span").length).toEqual(0);
      expect(component).toMatchSnapshot();
    });
  });
  describe("intersectionObserverTests", () => {
    let oldIntersectionObserver;
    beforeEach(() => {
      oldIntersectionObserver = global.window.IntersectionObserver;
      class FakeIntersectionObserver {
        static callback;

        static observe = jest.fn();

        static disconnect = jest.fn();

        constructor(callback, options) {
          FakeIntersectionObserver.callback = callback;
          this.options = options;
        }

        observe = FakeIntersectionObserver.observe;

        disconnect = FakeIntersectionObserver.disconnect;

        static intersect() {
          FakeIntersectionObserver.callback([{ isIntersecting: true }]);
        }
      }
      global.window.IntersectionObserver = FakeIntersectionObserver;
    });

    afterEach(() => {
      global.window.IntersectionObserver = oldIntersectionObserver;
    });

    it("intersects", async () => {
      create(
        <ViewCountWrapper trackingName="hello1" displayFunction={() => false}>
          <span>Hello</span>
        </ViewCountWrapper>
      );
      await delay(0);
      expect(window.sessionStorage.getItem("view-count")).toEqual(
        JSON.stringify({ hello1: 1 })
      );

      global.window.IntersectionObserver.intersect();

      expect(window.sessionStorage.getItem("view-count")).toEqual(
        JSON.stringify({ hello1: 2 })
      );
      expect(
        global.window.IntersectionObserver.disconnect
      ).toHaveBeenCalledWith();
    });
  });
  describe("using a display function [1,3,5]", () => {
    it("only on first", async () => {
      const trackingName = "hello1";
      const setCount = count =>
        window.sessionStorage.setItem(
          "view-count",
          JSON.stringify({ [trackingName]: count })
        );

      const render = () =>
        create(
          <ViewCountWrapper
            trackingName={trackingName}
            displayFunction={value => [1, 3].includes(value)}
          >
            <span>Hello</span>
          </ViewCountWrapper>
        );
      setCount(1);
      let component = render();
      await delay(0);
      expect(component.root.findAllByType("span").length).toEqual(1);

      setCount(2);
      component = render();
      await delay(0);
      expect(component.root.findAllByType("span").length).toEqual(0);

      setCount(3);
      component = render();
      await delay(0);
      expect(component.root.findAllByType("span").length).toEqual(1);

      setCount(4);
      component = render();
      await delay(0);
      expect(component.root.findAllByType("span").length).toEqual(0);

      setCount(5);
      component = render();
      await delay(0);
      expect(component.root.findAllByType("span").length).toEqual(0);
    });
  });
});
