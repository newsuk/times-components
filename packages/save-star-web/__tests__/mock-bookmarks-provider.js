/* eslint-disable react/prop-types */
import React, { Component } from "react";
import {
  bookmarks,
  MockedProvider,
  schemaToMocks
} from "@times-components/provider-test-tools";

function setDelay(mocks, delay) {
  return mocks.map(mock => ({ ...mock, delay }));
}

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
    const mocks = setDelay(bookmarks({ id: articleId }), delay);

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

MockBookmarksProvider.defaultProps = {
  delay: 0
};

export default MockBookmarksProvider;
