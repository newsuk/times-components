import React from "react";
import { create } from "react-test-renderer";
import { delay } from "@times-components/test-utils";

import ViewCountWrapper from "../../src/article-body/view-count-wrapper";

describe("<ViewCountWrapper>", () => {
  describe("display function", () => {
    it("always renders", () => {
      const mockStorage = {
        getItem: jest.fn(() => null),
        setItem: jest.fn()
      };
      const component = create(
        <ViewCountWrapper
          trackingName="hello1"
          storageProvider={mockStorage}
          displayFunction={() => true}
        >
          <span>Hello</span>
        </ViewCountWrapper>
      );
      expect(component.root.findAllByType("span").length).toEqual(1);
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
    describe("using a display function [1,3,5]", () => {
      it("only on first", async () => {
        let viewCount = 1;
        const mockStorage = {
          getItem: jest.fn(
            x => console.log("xxx", x) || JSON.stringify({ hello1: viewCount })
          ),
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
});
