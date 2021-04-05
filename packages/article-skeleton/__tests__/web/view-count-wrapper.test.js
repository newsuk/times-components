import React from "react";
import { create } from "react-test-renderer";
import { delay } from "@times-components/test-utils";

import ViewCountWrapper from "../../src/article-body/view-count-wrapper";

describe("<ViewCountWrapper>", () => {
  beforeEach(() => {
    window.document.cookie = "nuk-consent-personalisation=1";
  });

  afterEach(() => {
    window.document.cookie = "nuk-consent-personalisation=;max-age=0";
  });
  describe("display function", () => {
    it("always renders", () => {
      const mockStorage = {
        getItem: jest.fn(() => null),
        setItem: jest.fn()
      };
      const component = create(
        <ViewCountWrapper trackingName="hello1" storageProvider={mockStorage}>
          <span>Hello</span>
        </ViewCountWrapper>
      );
      expect(component.root.findAllByType("span").length).toEqual(1);
      expect(component).toMatchSnapshot();
    });
    it("doesnt render without consent", () => {
      const mockStorage = {
        getItem: jest.fn(() => null),
        setItem: jest.fn()
      };
      window.document.cookie = "nuk-consent-personalisation=;max-age=0";

      const component = create(
        <ViewCountWrapper trackingName="hello1" storageProvider={mockStorage}>
          <span>Hello</span>
        </ViewCountWrapper>
      );
      expect(component.root.findAllByType("span").length).toEqual(0);
      expect(component).toMatchSnapshot();
    });
    it("never renders", () => {
      const mockStorage = {
        getItem: jest.fn(() => null),
        setItem: jest.fn()
      };
      const component = create(
        <ViewCountWrapper
          trackingName="hello1"
          storageProvider={mockStorage}
          displayFunction={() => false}
        >
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
      const mockStorage = {
        getItem: jest.fn(() => null),
        setItem: jest.fn()
      };

      create(
        <ViewCountWrapper
          trackingName="hello1"
          storageProvider={mockStorage}
          displayFunction={() => false}
        >
          <span>Hello</span>
        </ViewCountWrapper>
      );
      await delay(0);
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        "view-count",
        JSON.stringify({ hello1: 1 })
      );

      global.window.IntersectionObserver.intersect();

      expect(mockStorage.setItem).toHaveBeenCalledTimes(2);
      expect(mockStorage.setItem).toHaveBeenCalledWith(
        "view-count",
        JSON.stringify({ hello1: 2 })
      );

      expect(
        global.window.IntersectionObserver.disconnect
      ).toHaveBeenCalledWith();
    });
  });
  describe("using a display function [1,3,5]", () => {
    it("only on first", async () => {
      let viewCount = 1;
      const mockStorage = {
        getItem: jest.fn(() => JSON.stringify({ hello1: viewCount })),
        setItem: jest.fn()
      };
      const render = () =>
        create(
          <ViewCountWrapper
            trackingName="hello1"
            storageProvider={mockStorage}
            displayFunction={value => [1, 3].includes(value)}
          >
            <span>Hello</span>
          </ViewCountWrapper>
        );
      viewCount = 1;
      let component = render();
      await delay(0);
      expect(component.root.findAllByType("span").length).toEqual(1);

      viewCount = 2;
      component = render();
      await delay(0);
      expect(component.root.findAllByType("span").length).toEqual(0);

      viewCount = 3;
      component = render();
      await delay(0);
      expect(component.root.findAllByType("span").length).toEqual(1);

      viewCount = 4;
      component = render();
      await delay(0);
      expect(component.root.findAllByType("span").length).toEqual(0);

      viewCount = 5;
      component = render();
      await delay(0);
      expect(component.root.findAllByType("span").length).toEqual(0);
    });
  });
});
