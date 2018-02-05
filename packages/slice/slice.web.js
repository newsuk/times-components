import React from "react";
import PropTypes from "prop-types";
import {
  SliceContainer,
  ChildrenContainer,
  ChildContainer
} from "./styles/responsive";

const Slice = ({ children, template }) => {
  if (!children) return null;

  const childArray = [...children];

  console.log(template); // eslint-disable-line

  // @TODO needs to be more agnostic of related articles specific styles / code
  return (
    <SliceContainer>
      <ChildrenContainer>
        {childArray.map(child => (
          <ChildContainer key={child.key}>{child}</ChildContainer>
        ))}
      </ChildrenContainer>
    </SliceContainer>
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
