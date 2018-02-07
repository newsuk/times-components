import React from "react";
import slicePropTypes from "./proptypes";
import getStyledComponent from "./styles/responsive";

const Slice = ({ children, template }) => {
  if (!children) return null;

  const StyledSliceContainer = getStyledComponent(template, "SliceContainer");
  const StyledChildrenContainer = getStyledComponent(
    template,
    "ChildrenContainer"
  );

  return (
    <StyledSliceContainer>
      <StyledChildrenContainer>{children}</StyledChildrenContainer>
    </StyledSliceContainer>
  );
};

Slice.propTypes = slicePropTypes;

export default Slice;
