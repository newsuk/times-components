import React from "react";
import propTypes from "./key-facts-title-prop-types";
import { KeyFactsTitleResponsive } from "./styles/responsive";
import styles from "./styles";

const KeyFactsTitle = ({ color, fontStyle, title }) => (
  <KeyFactsTitleResponsive style={[styles.title, { color }, fontStyle]}>
    {title.toUpperCase()}
  </KeyFactsTitleResponsive>
);

KeyFactsTitle.propTypes = propTypes;

export default KeyFactsTitle;
