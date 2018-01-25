import React from "react";
import { StyleSheet, View } from "react-native";
import RelatedArticlesContent from "./related-articles-content";
import RelatedArticlesHeading from "./related-articles-heading";
import { propTypes, defaultProps } from "./related-articles-prop-types";
import SharedStyles from "./styles/shared";

const styles = StyleSheet.create(SharedStyles);

const RelatedArticles = ({ item, template }) => (
  <View style={styles.container} template={template}>
    <RelatedArticlesHeading />
    <RelatedArticlesContent item={item} />
  </View>
);

RelatedArticles.propTypes = propTypes;
RelatedArticles.defaultProps = defaultProps;

export default RelatedArticles;
