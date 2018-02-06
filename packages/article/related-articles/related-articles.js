import React from "react";
import { StyleSheet, View } from "react-native";
import Slice from "@times-components/slice";
import RelatedArticlesHeading from "./heading";
import RelatedArticleItem from "./related-article-item";
import { propTypes, defaultProps } from "./proptypes";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
});

const RelatedArticles = ({ item, template }) => {
  if (!item) return null;
  return (
    <View style={styles.container}>
      <RelatedArticlesHeading />
      <Slice template={template}>
        <RelatedArticleItem item={item} />
      </Slice>
    </View>
  );
};

RelatedArticles.propTypes = propTypes;
RelatedArticles.defaultProps = defaultProps;

export default RelatedArticles;
