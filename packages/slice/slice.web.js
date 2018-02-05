import React from "react";
import PropTypes from "prop-types";
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

Slice.propTypes = {
  template: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

Slice.defaultProps = {
  template: "DEFAULT"
};

export default Slice;
