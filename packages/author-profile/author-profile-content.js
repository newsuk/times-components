import React, { Component } from "react";
import { ListView, StyleSheet, View } from "react-native";
import AuthorHead from "@times-components/author-head";
import Pagination from "@times-components/pagination";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";
import propTypes from "./author-profile-content-prop-types";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  spacing: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    maxWidth: 800
  }
});

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
      count: props.count,
      dataSource: cloneArticlesWithRows(props.articles)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      count: nextProps.count,
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
      onNext,
      onPrev,
      page,
      pageSize,
      onArticlePress
    } = this.props;

    const { count, dataSource } = this.state;

    return (
      <ListView
        dataSource={dataSource}
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
          <View>
            <AuthorHead
              name={name}
              bio={biography}
              uri={uri}
              title={jobTitle}
              twitter={twitter}
              onTwitterLinkPress={onTwitterLinkPress}
            />
            <View style={styles.container}>
              <View style={styles.spacing}>
                <Pagination
                  count={count}
                  generatePageLink={pageNum => `?page=${pageNum}`}
                  onNext={onNext}
                  onPrev={onPrev}
                  page={page}
                  pageSize={pageSize}
                />
              </View>
            </View>
          </View>
        )}
        renderSeparator={() => <AuthorProfileItemSeparator />}
      />
    );
  }
}

AuthorProfileContent.propTypes = propTypes;
export default AuthorProfileContent;
