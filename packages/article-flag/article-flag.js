import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

class ArticleFlag extends Component {
  render() {
    const {
      title,
      value,
      style
    } = this.props;

    if (!value) {
      return null;
    }

    return (
      <Text style={style}>
        {title}
      </Text>
    );
  }
}

ArticleFlag.propTypes = {
  title: React.PropTypes.string,
  value: React.PropTypes.bool,
  style: React.PropTypes.instanceOf(StyleSheet)
}

ArticleFlag.defaultProps = {
  style: null
}

export default ArticleFlag;
