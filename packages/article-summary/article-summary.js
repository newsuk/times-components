import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import summarise from "./summarise";
import renderer from "./article-summary-renderer";
import ArticleSummaryHeadline from "./article-summary-headline";

const styles = {
  text: {
    color: "#696969",
    fontSize: 14,
    fontFamily: "TimesDigitalW04",
    lineHeight: 20,
    marginBottom: 10,
    flexWrap: "wrap"
  },
  metaText: {
    color: "#696969",
    fontSize: 13,
    lineHeight: 15,
    fontFamily: "GillSansMTStd-Medium",
    marginBottom: 5
  }
};

const ArticleSummary = props => {
  const { Label, Headline, summaryText, DatePublication, Byline } = props;

  return (
    <View>
      <Label />
      <Headline />
      <Text style={styles.text}>{summaryText()}</Text>
      <Text
        style={styles.metaText}
        accessibilityLabel="datePublication"
        testID="datePublication"
      >
        <DatePublication />
      </Text>
      <Text style={styles.metaText}>
        <Byline />
      </Text>
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
  Label: () => null,
  Headline: () => null,
  summaryText: () => [],
  DatePublication: () => null,
  Byline: () => null
};

export { summarise, renderer, ArticleSummaryHeadline };

export default ArticleSummary;
