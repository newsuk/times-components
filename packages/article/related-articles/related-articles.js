import React from "react";
import { StyleSheet, View } from "react-native";
import Slice from "@times-components/slice";
import RelatedArticlesHeading from "./heading";
import { propTypes, defaultProps } from "./proptypes";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
});

const RelatedArticles = ({ item, template }) => (
  <View style={styles.container} template={template}>
    <RelatedArticlesHeading />
    <Slice item={item} />
  </View>
);

RelatedArticles.propTypes = propTypes;
RelatedArticles.defaultProps = defaultProps;

export default RelatedArticles;
