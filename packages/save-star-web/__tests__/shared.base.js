/* eslint-disable react/prop-types,react/no-unused-state */
import React, { Component } from "react";
import TestRenderer from "react-test-renderer";
import { delay } from "@times-components/test-utils";
import Link from "@times-components/link";

jest.doMock("../src/save-api", () => {
  let setSavedStatus;
  let setIsLoading;
  let state;

  class MockSaveApi extends Component {
    state = {
      savedStatus: false,
      isLoading: false,
      toggleSaved: jest.fn()
    };

    constructor(props) {
      super(props);

      setSavedStatus = savedStatus => this.setState({ savedStatus });
      setIsLoading = isLoading => this.setState({ isLoading });
    }

    render() {
      ({ state } = this);

      const { children } = this.props;

      return children(state);
    }
  }

  return {
    __esModule: true,
    default: MockSaveApi,
    getMock: () => ({ ...state, setSavedStatus, setIsLoading })
  };
});

const { getMock } = require("../src/save-api");
const SaveStarWeb = require("../src/save-star-web").default;

export default () => {
  describe("save star component", () => {
    it("star with saved status renders correctly", async () => {
      const testInstance = TestRenderer.create(
        <SaveStarWeb articleId="article-id" />
      );

      getMock().setSavedStatus(true);

      await delay(0);
      expect(testInstance).toMatchSnapshot();
    });

    it("star with unsaved status renders correctly", async () => {
      const testInstance = TestRenderer.create(
        <SaveStarWeb articleId="article-id" />
      );

      getMock().setSavedStatus(false);

      await delay(0);
      expect(testInstance).toMatchSnapshot();
    });

    it("save star loading state", async () => {
      const testInstance = TestRenderer.create(
        <SaveStarWeb articleId="article-id" />
      );

      getMock().setIsLoading(true);

      await delay(0);
      expect(testInstance).toMatchSnapshot();
    });

    it("check that toggleSaved method is invoked", async () => {
      const testInstance = TestRenderer.create(
        <SaveStarWeb articleId="article-id" />
      );

      const { toggleSaved, setSavedStatus } = getMock();

      setSavedStatus(true);

      const [saveStarLink] = testInstance.root.findAllByType(Link);
      await delay(0);

      saveStarLink.props.onPress({ preventDefault() {} });

      expect(toggleSaved).toHaveBeenCalledWith({
        savedStatus: true,
        articleId: "article-id"
      });
    });

    it("check that the event default is properly prevented", async () => {
      const testInstance = TestRenderer.create(
        <SaveStarWeb articleId="article-id" />
      );

      const [saveStarLink] = testInstance.root.findAllByType(Link);
      await delay(0);

      const preventDefault = jest.fn();
      saveStarLink.props.onPress({ preventDefault });

      expect(preventDefault).toHaveBeenCalled();
    });
  });
};
