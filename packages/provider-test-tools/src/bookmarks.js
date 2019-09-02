/* eslint-disable react/prop-types */
import React, { Component } from "react";
import {
  getBookmarks,
  saveBookmarks,
  unsaveBookmarks
} from "@times-components/provider-queries";

import MockedProvider from "./mocked-provider";
import { schemaToMocks } from "./mock-fixture";

const createBookmarkMocks = ({ id } = {}, delay) => [
  {
    defaults: {
      types: {
        Bookmark: () => ({
          id
        }),
        PageOfBookmarks: () => ({
          bookmarks: [],
          total: 0
        })
      }
    },
    query: getBookmarks,
    variables: {},
    delay
  },
  {
    query: saveBookmarks,
    variables: {
      id
    },
    defaults: {
      mutationValues: {
        saveBookmarks: () => [{ id, __typename: "Bookmark" }]
      }
    },
    repeatable: true,
    delay
  },
  {
    query: unsaveBookmarks,
    variables: {
      id
    },
    defaults: {
      mutationValues: {
        unsaveBookmarks: () => [id]
      }
    },
    repeatable: true,
    delay
  }
];

class MockBookmarksProvider extends Component {
  static getMocks({ articleId, delay }) {
    const mocks = createBookmarkMocks({ id: articleId }, delay);

    return schemaToMocks(mocks);
  }

  static cache = null;

  static async prepareCache({ articleId, delay }) {
    const mocks = await this.getMocks({ articleId, delay });

    this.cache = { delay, articleId, mocks };
  }

  static destroyCache() {
    this.cache = null;
  }

  static isCacheValid({ articleId, delay }) {
    const { cache } = this;

    return cache && cache.articleId === articleId && cache.delay === delay;
  }

  state = { mocks: [] };

  async componentDidMount() {
    await this.setMocks();
  }

  async componentDidUpdate(prevProps) {
    const { articleId, delay } = this.props;

    if (prevProps.articleId !== articleId || prevProps.delay !== delay) {
      await this.setMocks();
    }
  }

  async setMocks() {
    const { articleId, delay } = this.props;

    this.setState({
      mocks: MockBookmarksProvider.isCacheValid({ articleId, delay })
        ? MockBookmarksProvider.cache.mocks
        : await MockBookmarksProvider.getMocks({ articleId, delay })
    });
  }

  render() {
    const { mocks } = this.state;
    const { children } = this.props;

    if (!mocks.length) {
      return null;
    }

    return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
  }
}

export { MockBookmarksProvider };

export default createBookmarkMocks;
