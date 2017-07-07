import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

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
    fontFamily: "TimesDigitalW04-Regular",
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
      {date}, {publication}
    </Text>
  );
}

const ArticleSummary = props => {
  const { label, headline, text, date, publication } = props;

  const labelText = label.toUpperCase();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{labelText}</Text>
      <Text style={styles.headline}>{headline}</Text>
      <Text style={styles.text}>{text}</Text>
      {renderPublicationDetails(date, publication, styles)}
    </View>
  );
};

ArticleSummary.propTypes = {
  label: PropTypes.string,
  headline: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  publication: PropTypes.string
};

ArticleSummary.defaultProps = {
  label: "",
  headline: "",
  text: "",
  date: "",
  publication: ""
};

export default ArticleSummary;
