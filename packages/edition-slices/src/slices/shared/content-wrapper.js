/**
 * ContentWrapper restricts the content area of each slice. It is used together with the Gutter component,
 * which sets the gutter space around the content. This component is currently used only for huge breakpoints.
 */

import React from "react";
import PropTypes from "prop-types";
import { TcView } from "@times-components/utils";
import styleFactory from "./styles";

const styles = styleFactory();

const ContentWrapper = ({ children }) => (
  <TcView style={styles.contentWrapperStyles}>{children}</TcView>
);

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContentWrapper;
