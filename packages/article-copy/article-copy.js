import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import HTMLView from "react-native-htmlview";

const styles = StyleSheet.create({
  p: {
    color: "#333",
    fontFamily: 'TimesDigital-Regular',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 10
  }
});

const ArticleCopy = ({ content }) => {
  const data = content.map((item, index) => {
    if (item.type === 'paragraph') {
      return (<HTMLView key={index} stylesheet={styles} value={'<p>' + item.data.text + '</p>'} />);
    }
  });

  return <ScrollView>{data}</ScrollView>;
}

ArticleCopy.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
}

export default ArticleCopy;
