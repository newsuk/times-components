/* eslint-disable react/prop-types */
import React, { Component } from "react";
import {
  bookmarks,
  MockedProvider,
  schemaToMocks
} from "@times-components/provider-test-tools";

class MockBookmarksProvider extends Component {
  state = { mocks: [] };

  componentDidMount() {
    this.setMocks();
  }

  componentDidUpdate(prevProps) {
    const { articleId } = this.props;

    if (prevProps.articleId !== articleId) {
      this.setMocks();
    }
  }

  setMocks() {
    const { articleId } = this.props;

    schemaToMocks(bookmarks({ id: articleId })).then(bookmarkMocks =>
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

export default MockBookmarksProvider;
