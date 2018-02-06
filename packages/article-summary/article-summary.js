import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { renderTrees } from "@times-components/markup";
import summarise from "./summarise";
import renderer from "./article-summary-renderer";
import ArticleSummaryHeadline from "./article-summary-headline";
import styles from "./styles";

function renderAst(ast) {
  return renderTrees(summarise(ast), renderer);
}

function renderAst(ast) {
  return renderTrees(summarise(ast), renderer);
}

const ArticleSummary = props => {
  const { Label, Headline, summaryText, DatePublication, Byline } = props;

  return (
    <View>
      {Label ? (
        <View style={styles.labelWrapper}>
          <Label />
        </View>
      ) : null}
      <Headline />
      <Text style={styles.text}>{summaryText()}</Text>
      <Text
        style={styles.metaText}
        accessibilityLabel="datePublication"
        testID="datePublication"
      >
        <DatePublication />
      </Text>
      {Byline ? (
        <Text style={styles.metaText}>
          <Byline />
        </Text>
      ) : null}
    </View>
  );
};

ArticleSummary.propTypes = {
  Label: PropTypes.func,
  Headline: PropTypes.func,
  summaryText: PropTypes.func,
  DatePublication: PropTypes.func,
  Byline: PropTypes.func
};


ArticleSummary.defaultProps = {
  Label: null,
  Headline: null,
  summaryText: () => [],
  DatePublication: null,
  Byline: null
};

export { renderAst, summarise, renderer, ArticleSummaryHeadline };

export default ArticleSummary;

