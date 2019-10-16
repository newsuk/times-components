import React, { useContext } from "react";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import {
  Paragraph as OriginalParagraph,
  ThemedParagraph
} from "./styles/responsive.web";

function Paragraph({ children }) {
  const { newskit } = useContext(Context);
  const Component = newskit ? ThemedParagraph : OriginalParagraph;

  return <Component>{children}</Component>;
}

Paragraph.propTypes = {
  children: PropTypes.node.isRequired
};

export default Paragraph;
