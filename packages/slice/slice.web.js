import React from "react";
import { propTypes, defaultProps } from "./proptypes";
import getTemplateName from "./styles/template-map";
import getStyledComponent, { Separator, SliceContainer } from "./styles";

const Slice = ({ children, template }) => {
  const childCount = children.length;
  const templateName = getTemplateName(template);
  const ChildrenContainer = getStyledComponent(
    templateName,
    "ChildrenContainer",
    { childCount }
  );

  const renderChildren = () =>
    children
      .map((child, index) => {
        const ChildContainer = getStyledComponent(
          templateName,
          "ChildContainer",
          { isFirstChild: index === 0 }
        );
        return (
          <ChildContainer key={`child-${child.key}`}>{child}</ChildContainer>
        );
      })
      .reduce((previous, current) => [
        ...(previous.length > 0 ? previous : [previous]),
        <Separator key={`separator-${current.key}`} />,
        current
      ]);

  return (
    <SliceContainer>
      <ChildrenContainer>{renderChildren()}</ChildrenContainer>
    </SliceContainer>
  );
};

Slice.propTypes = propTypes;
Slice.defaultProps = defaultProps;

export default Slice;
