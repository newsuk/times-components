import React from "react";
import { propTypes, defaultProps } from "./proptypes";
import getTemplateName from "./styles/template-map";
import getStyledComponent, { Separator, SliceContainer } from "./styles";

const Slice = ({ children, template }) => {
  const templateName = getTemplateName(template);
  const ChildrenContainer = getStyledComponent(
    templateName,
    "ChildrenContainer",
    { childCount: children.length }
  );

  const renderChildren = () =>
    children.reduce((previous, current) => {
      const ChildContainer = getStyledComponent(templateName, "ChildContainer");
      const ChildCurrentContainer = getStyledComponent(
        templateName,
        "ChildCurrentContainer"
      );
      return [
        ...(previous.length > 0
          ? previous
          : [
              <ChildContainer key={`child-${previous.key}`}>
                {previous}
              </ChildContainer>
            ]),
        <Separator key={`separator-${current.key}`} />,
        <ChildCurrentContainer key={`child-${current.key}`}>
          {current}
        </ChildCurrentContainer>
      ];
    });

  return (
    <SliceContainer>
      <ChildrenContainer>{renderChildren()}</ChildrenContainer>
    </SliceContainer>
  );
};

Slice.propTypes = propTypes;
Slice.defaultProps = defaultProps;

export default Slice;
