import React from "react";
import { propTypes, defaultProps } from "./proptypes";
import getTemplateName from "./styles/template-map";
import getStyledComponent from "./styles";

const Slice = ({ children, template }) => {
  const templateName = getTemplateName(template);
  const StyledSliceContainer = getStyledComponent(
    templateName,
    "SliceContainer"
  );
  const StyledChildrenContainer = getStyledComponent(
    templateName,
    "ChildrenContainer",
    children.length
  );

  return (
    <StyledSliceContainer>
      <StyledChildrenContainer>{children}</StyledChildrenContainer>
    </StyledSliceContainer>
  );
};

Slice.propTypes = propTypes;
Slice.defaultProps = defaultProps;

export default Slice;
