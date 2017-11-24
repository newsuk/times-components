import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import AuthorProfileAuthorHead from "./author-profile-author-head";
import AuthorProfilePagination from "./author-profile-pagination";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";
import propTypes from "./author-profile-content-prop-types";
import { normaliseWidth } from "./utils";

const styles = StyleSheet.create({
  padding: {
    paddingLeft: 10,
    paddingRight: 10
  }
});

class AuthorProfileContent extends React.Component {
  constructor(props) {
    super(props);

    const { width } = Dimensions.get("window");

    this.state = {
      count: props.count,
      width: normaliseWidth(width)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.count) {
      this.setState({
        count: nextProps.count
      });
    }
  }

  render() {
    const { count } = this.state;

    const {
      isLoading,
      articles,
      articlesLoading,
      biography,
      jobTitle,
      name,
      onArticlePress,
      onNext,
      onPrev,
      onTwitterLinkPress,
      page,
      pageSize,
      twitter,
      uri,
      imageRatio
    } = this.props;

    const paginationComponent = (hideResults = false) => (
      <AuthorProfilePagination
        count={count}
        hideResults={hideResults}
        onNext={onNext}
        onPrev={onPrev}
        page={page}
        pageSize={pageSize}
      />
    );

    const data = articlesLoading
      ? Array(pageSize)
          .fill()
          .map((number, id) => ({
            id,
            isLoading: true
          }))
      : articles;

    return (
      <FlatList
        testID="scroll-view"
        accessibilityID="scroll-view"
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <AuthorProfileItem
            {...item}
            imageRatio={imageRatio}
            imageSize={this.state.width}
            style={styles.padding}
            testID={`articleList-${index}`}
            onPress={e => onArticlePress(e, { id: item.id, url: item.url })}
          />
        )}
        initialListSize={pageSize}
        scrollRenderAheadDistance={2}
        pageSize={pageSize}
        ListHeaderComponent={
          <View>
            <AuthorProfileAuthorHead
              isLoading={isLoading}
              name={name}
              bio={biography}
              uri={uri}
              title={jobTitle}
              twitter={twitter}
              onTwitterLinkPress={onTwitterLinkPress}
            />
            {paginationComponent()}
          </View>
        }
        ListFooterComponent={paginationComponent(true)}
        ItemSeparatorComponent={() => (
          <View style={styles.padding}>
            <AuthorProfileItemSeparator />
          </View>
        )}
      />
    );
  }
}

AuthorProfileContent.propTypes = propTypes;
export default AuthorProfileContent;
