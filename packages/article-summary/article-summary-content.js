import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { treePropType } from "@times-components/markup";
import { renderAst } from './'; 
import styles from "./styles";

export default function ArticleSummaryContent({ast = []}) {
  return (ast.length > 0) ? (
    <Text style={styles.text}>
     {renderAst(ast)}
    </Text>
  ) : null;
}

ArticleSummaryContent.propTypes = {
  ast: PropTypes.arrayOf(treePropType)
}

