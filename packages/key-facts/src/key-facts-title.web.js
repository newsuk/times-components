import React from "react";
import propTypes from "./key-facts-title-prop-types";
import { KeyFactsTitleResponsive } from "./styles/responsive";

const KeyFactsTitle = ({ styles, title }) => (
  <KeyFactsTitleResponsive style={styles.title}>
    {title.toUpperCase()}
  </KeyFactsTitleResponsive>
);

KeyFactsTitle.propTypes = propTypes;

export default KeyFactsTitle;
