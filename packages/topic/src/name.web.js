import React from "react";
import { propTypes } from "./proptypes";
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

Name.propTypes = propTypes.name;

export default Name;
