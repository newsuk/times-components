/* eslint-disable react/no-array-index-key */
import React from "react";
import { Text } from "react-native";
import Link from "@times-components/link";
import { builder } from "@times-components/markup";
import styles from "./article-byline-styles";

import {
  articleBylinePropTypes,
  articleBylineDefaultPropTypes
} from "./article-byline-proptypes";

const ArticleBylineWeb = ({ ast, style }) =>
  <Text style={[styles.byline, style.byline]}>
    {builder({ ast }).map((el, i) =>
      React.cloneElement(el, {
        key: i,
        style: {
          ...el.props.style,
          ...(style.link && el.type === Link ? style.link : {})
        }
      })
    )}
  </Text>;

export default ArticleBylineWeb;

ArticleBylineWeb.propTypes = articleBylinePropTypes;

ArticleBylineWeb.defaultProps = articleBylineDefaultPropTypes;
