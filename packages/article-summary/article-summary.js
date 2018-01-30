import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

import { renderTrees, treePropType } from "@times-components/markup";
import DatePublication from "@times-components/date-publication";
import ArticleByline from "@times-components/article-byline";

import ArticleSummaryHeadline from "./article-summary-headline";
import renderer from "./article-summary-renderer";

const styles = {
  container: {},
  label: {
    color: "#333333",
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 12,
    marginBottom: 2,
    letterSpacing: 1
  },
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

const summarise = text => {
  if (!text.length) {
    return text;
  }

  const initial = text.slice(0, text.length - 1);
  const last = text[text.length - 1];
  const teaser = Object.assign({}, last, {
    name: "teaser",
    attributes: { isSingle: initial.length === 0 }
  });

  return [...initial, teaser];
};

const ArticleSummary = props => {
  const {
    label,
    headline,
    hasResponsiveHeadline,
    text,
    date,
    publication,
    showPublication,
    byline
  } = props;
  const summary = summarise(text);
  const labelText = label && label.toUpperCase && label.toUpperCase();

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{labelText}</Text> : null}
      {headline ? (
        <ArticleSummaryHeadline
          hasResponsiveHeadline={hasResponsiveHeadline}
          headline={headline}
        />
      ) : null}
      <Text style={styles.text}>{renderTrees(summary, renderer)}</Text>
      <Text
        style={styles.metaText}
        accessibilityLabel="datePublication"
        testID="datePublication"
      >
        <DatePublication
          date={date}
          publication={publication}
          showPublication={showPublication}
        />
      </Text>
      {byline.length ? (
        <Text style={styles.metaText}>
          <ArticleByline ast={byline} />
        </Text>
      ) : null}
    </View>
  );
};

ArticleSummary.propTypes = {
  label: PropTypes.string,
  headline: PropTypes.string,
  hasResponsiveHeadline: PropTypes.bool,
  text: PropTypes.arrayOf(treePropType),
  date: DatePublication.propTypes.date,
  publication: DatePublication.propTypes.publication,
  showPublication: DatePublication.propTypes.showPublication,
  byline: PropTypes.arrayOf(treePropType)
};

ArticleSummary.defaultProps = {
  label: "",
  headline: "",
  hasResponsiveHeadline: false,
  text: [],
  date: null,
  publication: DatePublication.defaultProps.publication,
  showPublication: DatePublication.defaultProps.showPublication,
  byline: []
};

export default ArticleSummary;
