import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import { treePropType } from "@times-components/markup";
import RelatedArticlesContent from "./related-articles-content";
import SharedStyles from "./styles/shared";

const styles = StyleSheet.create(SharedStyles);

const RelatedArticles = ({ item, template }) => (
  <View style={styles.container} template={template}>
    <Text style={styles.title}>Related links</Text>
    <RelatedArticlesContent item={item} />
  </View>
);

RelatedArticles.propTypes = {
  item: PropTypes.shape({
    byline: PropTypes.arrayOf(treePropType),
    headline: PropTypes.string,
    label: PropTypes.string,
    onPress: PropTypes.func,
    publicationName: PropTypes.string,
    publishedTime: PropTypes.string,
    summary: PropTypes.arrayOf(treePropType),
    url: PropTypes.string
  }).isRequired,
  template: PropTypes.string
};

RelatedArticles.defaultProps = {
  template: "DEFAULT"
};

export default RelatedArticles;
