import React from "react";
import slicePropTypes from "./proptypes";
import getStyledComponent from "./styles/responsive";

const Slice = ({ children, template }) => {
  if (!children) return null;

  const childArray = [...children];
  const StyledSliceContainer = getStyledComponent(template, "SliceContainer");
  const StyledChildrenContainer = getStyledComponent(
    template,
    "ChildrenContainer"
  );
  const StyledChildContainer = getStyledComponent(template, "ChildContainer");

  return (
    <StyledSliceContainer>
      <StyledChildrenContainer>
        {childArray.map(child => (
          <StyledChildContainer key={child.key}>{child}</StyledChildContainer>
        ))}
      </StyledChildrenContainer>
    </StyledSliceContainer>
  );
};

Slice.propTypes = slicePropTypes;

export default Slice;
