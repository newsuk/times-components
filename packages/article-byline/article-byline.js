/* eslint-disable react/no-array-index-key */
import React from "react";
import { View } from "react-native";
import Link from "@times-components/link";
import { builder } from "@times-components/markup";
import styles from "./article-byline-styles";

import {
  articleBylinePropTypes,
  articleBylineDefaultPropTypes
} from "./article-byline-proptypes";

const ArticleByline = ({ ast, style }) => (
  <View style={[styles.container, style.container]}>
    {builder({ ast }).map((el, i) => {
      const customElementStyle = {
        ...el.props.style, // Element styles
        ...styles.byline, // base byline component styles
        ...(style.byline && el.type !== Link ? style.byline : {}), // Custom text styles
        ...(style.link && el.type === Link ? style.link : {}), // Custom Link styles
        ...(el.type !== Link ? styles.bylineColor : {}) // Default byline text color
      };

      return React.cloneElement(el, {
        key: i,
        style: customElementStyle
      });
    })}
  </View>
);

export default ArticleByline;

ArticleByline.propTypes = articleBylinePropTypes;

ArticleByline.defaultProps = articleBylineDefaultPropTypes;
