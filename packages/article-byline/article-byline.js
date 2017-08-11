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

export default function ArticleBylineWeb({ ast, style }) {
  if (!ast) {
    return null;
  }

  return (
    <Text>
      {builder({ ast }).map(
        (el, i) => (
          <Text style={[styles.byline, style.byline]} key={i}>
            {React.cloneElement(el, {
              style: {
                ...el.props.style,
                ...(style.link && el.type === Link ? style.link : {})
              }
            })}
          </Text>
        )
      )}
    </Text>
  );
}

ArticleBylineWeb.propTypes = articleBylinePropTypes;

ArticleBylineWeb.defaultProps = articleBylineDefaultPropTypes;
