/* eslint-disable react/prop-types, react/no-multi-comp */

import React, { Component } from "react";

const articleList = [
  {
    headline: "Headline 1",
    id: "d98c257c-cb16-11e7-b529-95e3fc05f40f",
    url: "https://article1.io"
  },
  {
    headline: "Headline 2",
    id: "d98c257c-cb16-11e7-b529-95e3fc05f40g",
    url: "https://article2.io"
  },
  {
    headline: "Headline 3",
    id: "d98c257c-cb16-11e7-b529-95e3fc05f40h",
    url: "https://article3.io"
  },
  {
    headline: "Headline 4",
    id: "d98c257c-cb16-11e7-b529-95e3fc05f40i",
    url: "https://article4.io"
  },
  {
    headline: "Headline 5",
    id: "d98c257c-cb16-11e7-b529-95e3fc05f40j",
    url: "https://article5.io"
  },
  {
    headline: "Headline 6",
    id: "d98c257c-cb16-11e7-b529-95e3fc05f40k",
    url: "https://article6.io"
  }
];

const topic = (first, skip = 0) => ({
  articles: {
    count: 7,
    list: articleList.slice(skip, skip + first)
  }
});

export class TopicArticlesProvider extends Component {
  constructor(props) {
    super(props);
    this.fetchMore = this.fetchMore.bind(this);
    this.state = { topic: topic(1) };
  }

  fetchMore({ variables, updateQuery }) {
    this.setState({
      topic: updateQuery(
        { topic: topic(1) },
        {
          fetchMoreResult:
            variables.skip === 3 ? null : { topic: topic(1, variables.skip) }
        }
      ).topic
    });
  }

  render() {
    const { children, pageSize } = this.props;

    return (
      <topicArticlesProvider>
        {children({
          topic: this.state.topic,
          fetchMore: this.fetchMore,
          pageSize,
          variables: {
            imageRatio: "5:4"
          }
        })}
      </topicArticlesProvider>
    );
  }
}

export default "Provider";
