import React, { Component } from "react";
import { ListView } from "react-native";
import AuthorHead from "@times-components/author-head";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";
import propTypes from "./author-profile-content-prop-types";

const cloneArticlesWithRows = articles => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

  return ds.cloneWithRows(articles);
};

class AuthorProfileContent extends Component {
  constructor(props) {
    super();

    this.state = {
      dataSource: cloneArticlesWithRows(props.articles)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: cloneArticlesWithRows(nextProps.articles)
    });
  }

  render() {
    const {
      name,
      biography,
      uri,
      jobTitle,
      twitter,
      onTwitterLinkPress,
      // onNext,
      pageSize,
      onArticlePress
    } = this.props;

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={article => (
          <AuthorProfileItem
            {...article}
            key={article.id}
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
        // onEndReached={() => onNext()}
      />
    );
  }
}

AuthorProfileContent.propTypes = propTypes;
export default AuthorProfileContent;
