import React from "react";
import { mount, shallow } from "enzyme";
import TestRenderer from "react-test-renderer";
import Link from "@times-components/link";
import { iterator, delay } from "@times-components/test-utils";
import SaveStarWeb from "../src/save-star-web";
import mockSaveApi from "../mock-save-api";

export default () => {
  const tests = [
    {
      name: "saved star with saved status",
      test: async () => {
        const testInstance = TestRenderer.create(
          <SaveStarWeb
            articleId="5504b5a8-b1c0-11e8-a553-a0ee9be48bc6"
            saveApi={mockSaveApi}
          />
        );
        await delay(0);
        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "saved star with unsaved status",
      test: async () => {
        const testInstance = TestRenderer.create(
          <SaveStarWeb
            articleId="6604b5a8-b1c0-11e8-a553-a0ee9be48bc6"
            saveApi={mockSaveApi}
          />
        );
        await delay(0);
        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name:
        "saved star with loading state while network request is fetching data",
      test: async () => {
        const apiMock = {
          ...mockSaveApi,
          getBookmarks: () =>
            Promise.resolve({
              loading: true
            })
        };

        const testInstance = TestRenderer.create(
          <SaveStarWeb
            articleId="6604b5a8-b1c0-11e8-a553-a0ee9be48bc6"
            saveApi={apiMock}
          />
        );
        await delay(0);
        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name:
        "Fetches saved articles for user and set in state and checks saved status to true",
      test: async () => {
        const wrapper = mount(
          <SaveStarWeb
            articleId="96508c84-6611-11e9-adc2-05e1b87efaea"
            saveApi={mockSaveApi}
          />
        );
        await delay(0);
        expect(wrapper.state("savedStatus")).toEqual(true);
      }
    },
    {
      name:
        "Fetches saved article when no saved articles for the user, status is correctly set ",
      test: async () => {
        const saveApi = {
          ...mockSaveApi,
          getBookmarks: () =>
            Promise.resolve({
              data: {
                viewer: {
                  bookmarks: {
                    bookmarks: [],
                    total: 0
                  }
                }
              },
              loading: false
            })
        };

        const wrapper = mount(
          <SaveStarWeb
            articleId="96508c84-6611-11e9-adc2-05e1b87efaea"
            saveApi={saveApi}
          />
        );
        await delay(0);
        expect(wrapper.state("savedStatus")).toEqual(false);
      }
    },
    {
      name:
        "Fetches saved article when no saved articles for the user, status is correctly set ",
      test: async () => {
        const saveApi = {
          ...mockSaveApi,
          getBookmarks: () =>
            Promise.resolve({
              data: {
                viewer: {
                  bookmarks: {
                    bookmarks: [],
                    total: 0
                  }
                }
              },
              loading: false
            })
        };

        const wrapper = mount(
          <SaveStarWeb
            articleId="96508c84-6611-11e9-adc2-05e1b87efaea"
            saveApi={saveApi}
          />
        );
        await delay(0);
        expect(wrapper.state("savedStatus")).toEqual(false);
      }
    },
    {
      name: "Clicks on save link to unsave",
      test: async () => {
        const wrapper = shallow(
          <SaveStarWeb
            articleId="96508c84-6611-11e9-adc2-05e1b87efaea"
            saveApi={mockSaveApi}
          />
        );
        await delay(0);
        const event = Object.assign(jest.fn(), { preventDefault: jest.fn() });
        wrapper.find(Link).simulate("press", event);
        await delay(0);

        expect(wrapper.state("savedStatus")).toEqual(false);
      }
    },
    {
      name: "Clicks on save link to save",
      test: async () => {
        const wrapper = shallow(
          <SaveStarWeb
            articleId="9bd029d2-49a1-11e9-b472-f58a50a13bbb"
            saveApi={mockSaveApi}
          />
        );
        await delay(0);
        const event = Object.assign(jest.fn(), { preventDefault: jest.fn() });
        wrapper.find(Link).simulate("press", event);
        await delay(0);

        expect(wrapper.state("savedStatus")).toEqual(true);
      }
    },
    {
      name: "Clicks on saved link calls unsave api",
      test: async () => {
        const apiSave = mockSaveApi;

        const unsaveSpy = jest.spyOn(apiSave, "unBookmark");

        const wrapper = shallow(
          <SaveStarWeb
            articleId="96508c84-6611-11e9-adc2-05e1b87efaea"
            saveApi={apiSave}
          />
        );
        await delay(0);
        const event = Object.assign(jest.fn(), { preventDefault: jest.fn() });
        wrapper.find(Link).simulate("press", event);
        await delay(0);

        expect(unsaveSpy).toHaveBeenCalled();
      }
    },
    {
      name: "Clicks on save link to call save api",
      test: async () => {
        const apiSave = mockSaveApi;

        const saveSpy = jest.spyOn(apiSave, "bookmark");

        const wrapper = shallow(
          <SaveStarWeb
            articleId="9bd029d2-49a1-11e9-b472-f58a50a13bbb"
            saveApi={apiSave}
          />
        );
        await delay(0);
        const event = Object.assign(jest.fn(), { preventDefault: jest.fn() });
        wrapper.find(Link).simulate("press", event);
        await delay(0);

        expect(saveSpy).toHaveBeenCalled();
      }
    }
  ];

  iterator(tests);
};
