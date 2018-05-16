import React from "react";
import PropTypes from "prop-types";
import { ResponsiveName } from "./styles/responsive";

const Name = ({ name }) => (
  <ResponsiveName
    testID="topic-name"
    accessibilityLabel="topic-name"
    accessibilityRole="heading"
  >
    {name}
  </ResponsiveName>
);

Name.propTypes = {
  name: PropTypes.string.isRequired
};

export default Name;
