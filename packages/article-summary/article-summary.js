import React from "react";
import { StyleSheet, Text, View } from "react-native";
import format from "date-fns/format";
import PropTypes from "prop-types";
import Markup, { builder } from "@times-components/markup";

const DATE_FORMAT = "dddd MMMM DD YYYY";

const styles = StyleSheet.create({
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
    fontFamily: "TimesDigital-Regular",
    lineHeight: 20,
    marginBottom: 10,
    flexWrap: "wrap"
  },
  meta: {
    color: "#696969",
    fontSize: 13,
    fontFamily: "GillSansMTStd-Medium"
  }
});

function renderPublicationDetails(date, publication, style) {
  if (!date || !publication) {
    return null;
  }

  return (
    <Text style={style.meta}>
      {format(date, DATE_FORMAT)}, {publication}
    </Text>
  );
}

const ArticleSummary = props => {
  const { label, headline, text: ast, date, publication } = props;

  const labelText = label && label.toUpperCase && label.toUpperCase();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{labelText}</Text>
      <Text style={styles.headline}>{headline}</Text>
      <Text style={styles.text}>
        {builder({ ast })}
      </Text>
      {renderPublicationDetails(date, publication, styles)}
    </View>
  );
};

ArticleSummary.propTypes = {
  label: PropTypes.string,
  headline: PropTypes.string,
  text: Markup.propTypes.ast,
  date: PropTypes.string,
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
