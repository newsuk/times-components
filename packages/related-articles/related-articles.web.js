import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import { treePropType } from "@times-components/markup";
import SharedStyles from "./styles/shared";
import MainContainer from "./styles/responsive";
import RelatedArticlesContent from "./related-articles-content";

const styles = StyleSheet.create(SharedStyles);

const RelatedArticles = ({ item, template }) => (
  <View style={styles.container} template={template}>
    <Text style={styles.title}>Related links</Text>
    <MainContainer>
      <RelatedArticlesContent item={item} />
    </MainContainer>
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
