import React from "react";
import { mount, shallow } from "enzyme";
import TestRenderer from "react-test-renderer";
import Link from "@times-components/link";
import { iterator, delay } from "@times-components/test-utils";
import SaveStarWeb from "../src/save-star-web";

/* eslint-disable global-require */
jest.mock("../src/make-client-util", () =>
  require("../__mocks__/make-client-util")
);

export default () => {
  const tests = [
    {
      name: "saved star with saved status",
      test: async () => {
        const testInstance = TestRenderer.create(
          <SaveStarWeb articleId="123" />
        );
        await delay(0);
        expect(expect(testInstance).toMatchSnapshot());
      }
    },
    {
      name: "saved star with unsaved status",
      test: async () => {
        const testInstance = TestRenderer.create(
          <SaveStarWeb articleId="765" />
        );
        await delay(0);
        expect(expect(testInstance).toMatchSnapshot());
      }
    },
    {
      name:
        "Fetches saved articles for user and set in state and checks saved status to true",
      test: async () => {
        const wrapper = mount(<SaveStarWeb articleId="123" />);
        await delay(0);
        expect(wrapper.state("savedArticles")).toEqual(["123", "456"]);
        expect(wrapper.state("savedStatus")).toEqual(true);
      }
    },
    // {
    //   name:
    //     "Fetches saved article when no saved articles for the user, status is correctly set ",
    //   test: async () => {
    //     jest.mock("../src/make-client-util", () => ({
    //       query: () =>
    //       Promise.resolve({
    //         data: {
    //           viewer: {
    //             bookmarks: {
    //               bookmarks: [],
    //               total: 0
    //             }
    //           }
    //         },
    //         loading: false
    //       })
    //     }));

    //     const wrapper = mount(<SaveStarWeb articleId="123" />);
    //     await delay(0);
    //     expect(wrapper.state("savedArticles")).toEqual([]);
    //     expect(wrapper.state("savedStatus")).toEqual(false);
    //   }
    // },
    {
      name: "Clicks on save link to unsave",
      test: async () => {
        const wrapper = shallow(<SaveStarWeb articleId="123" />);
        await delay(0);
        const event = Object.assign(jest.fn(), { preventDefault: () => {} });
        wrapper.find(Link).simulate("press", event);
        await delay(0);

        expect(wrapper.state("savedArticles")).toEqual(["456"]);
        expect(wrapper.state("savedStatus")).toEqual(false);
      }
    },
    {
      name: "Clicks on save link to save",
      test: async () => {
        const wrapper = shallow(<SaveStarWeb articleId="567" />);
        await delay(0);
        const event = Object.assign(jest.fn(), { preventDefault: () => {} });
        wrapper.find(Link).simulate("press", event);
        await delay(0);

        expect(wrapper.state("savedArticles")).toEqual(["123", "456", "567"]);
        expect(wrapper.state("savedStatus")).toEqual(true);
      }
    }
  ];

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  iterator(tests);
};
