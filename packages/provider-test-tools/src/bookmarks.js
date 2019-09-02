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
  state = { mocks: [] };

  componentDidMount() {
    this.setMocks();
  }

  componentDidUpdate(prevProps) {
    const { articleId, delay } = this.props;

    if (prevProps.articleId !== articleId || prevProps.delay !== delay) {
      this.setMocks();
    }
  }

  setMocks() {
    const { articleId, delay } = this.props;
    const mocks = createBookmarkMocks({ id: articleId }, delay);

    return schemaToMocks(mocks).then(bookmarkMocks =>
      this.setState({ mocks: bookmarkMocks })
    );
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
