import React from "react";
import { mount, shallow } from "enzyme";
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
      name:
        "Fetches saved articles for user and set in state and checks saved status",
      test: async () => {
        const wrapper = mount(<SaveStarWeb articleId="123" />);
        await delay(0);
        expect(wrapper.state("savedArticles")).toEqual(["123", "456"]);
        expect(wrapper.state("savedStatus")).toEqual(true);
      }
    },
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
        jest.mock("../src/make-client-util", () => ({
          mutate: () =>
            Promise.resolve({
              data: {
                saveBookmarks: [
                  {
                    id: "123"
                  },
                  {
                    id: "456"
                  },
                  {
                    id: "567"
                  }
                ]
              }
            })
        }));

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
  iterator(tests);
};
