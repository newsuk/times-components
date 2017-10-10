import React, { Component } from "react";
import { ListView } from "react-native";
import AuthorHead from "@times-components/author-head";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

export default class AuthorProfileContent extends Component {
  constructor(props) {
    super();

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.articles)
    };
  }

  render() {
    const {
      name,
      biography,
      uri,
      jobTitle,
      twitter,
      onTwitterLinkPress,
      onNext,
      pageSize,
      onArticlePress
    } = this.props;

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={({ article }) => (
          <AuthorProfileItem
            {...article}
            onPress={e =>
              onArticlePress(e, { id: article.id, url: article.url })}
          />
        )}
        initialListSize={pageSize}
        scrollRenderAheadDistance={2}
        pageSize={pageSize}
        renderHeader={() => (
          <AuthorHead
            name={name}
            bio={biography}
            uri={uri}
            title={jobTitle}
            twitter={twitter}
            onTwitterLinkPress={onTwitterLinkPress}
          />
        )}
        renderSeparator={() => <AuthorProfileItemSeparator />}
        onEndReached={() => onNext()}
      />
    );
  }
}
