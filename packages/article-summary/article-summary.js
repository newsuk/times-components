import React from "react";
import { Text, View, Platform } from "react-native";
import PropTypes from "prop-types";
import { renderTrees, treePropType } from "@times-components/markup";
import DatePublication from "@times-components/date-publication";
import renderer from "./article-summary-renderer";

const fontFamilyWebAndIos = "TimesDigitalW04";
const fontFamilyAndroid = "TimesDigitalW04-Regular";

const styles = {
  container: {},
  label: {
    color: "#333333",
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 12,
    marginBottom: 2,
    letterSpacing: 1
  },
  headline: {
    color: "#333333",
    fontSize: 22,
    lineHeight: 22,
    marginBottom: 8,
    fontFamily: "TimesModern-Bold",
    fontWeight: "400"
  },
  text: {
    color: "#696969",
    fontSize: 14,
    fontFamily:
      Platform.OS === "android" ? fontFamilyAndroid : fontFamilyWebAndIos,
    lineHeight: 20,
    marginBottom: 10,
    flexWrap: "wrap"
  }
};

const trimEmptyContent = arr => {
  const reversed = [...arr].reverse();
  const firstElWithContent = reversed.findIndex(el => el.children.length > 0);
  return reversed.slice(firstElWithContent).reverse();
};

const summarise = text => {
  let summary = trimEmptyContent(text);

  if (summary.length) {
    const initial = summary.slice(0, summary.length - 1);
    const last = summary[summary.length - 1];
    const teaser = Object.assign({}, last, { name: "teaser" });
    summary = [...initial, teaser];
  }
  return summary;
};

const ArticleSummary = props => {
  const { label, headline, text, date, publication } = props;
  const summary = summarise(text);
  const labelText = label && label.toUpperCase && label.toUpperCase();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{labelText}</Text>
      <Text style={styles.headline}>{headline}</Text>
      <Text style={styles.text}>{renderTrees(summary, renderer)}</Text>
      <DatePublication date={date} publication={publication} />
    </View>
  );
};

ArticleSummary.propTypes = {
  label: PropTypes.string,
  headline: PropTypes.string,
  text: PropTypes.arrayOf(treePropType),
  date: PropTypes.instanceOf(Date),
  publication: PropTypes.string
};

ArticleSummary.defaultProps = {
  label: "",
  headline: "",
  text: [],
  date: null,
  publication: ""
};

export default ArticleSummary;
