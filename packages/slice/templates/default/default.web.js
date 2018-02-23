import React from "react";
import propTypes from "./proptypes";
import { Separator, SliceContainer } from "../shared.responsive";
import { getChildrenContainer, ChildContainer } from "./responsive";

const DefaultSlice = ({ children }) => {
  const ChildrenContainer = getChildrenContainer(children);
  ChildrenContainer.displayName = "ChildrenContainer";
  return (
    <SliceContainer>
      <ChildrenContainer>
        {children
          .map(child => (
            <ChildContainer key={child.key}>{child}</ChildContainer>
          ))
          .reduce((previous, current) => [
            ...(previous.length > 0 ? previous : [previous]),
            <Separator key={`separator-${current.key}`} />,
            current
          ])}
      </ChildrenContainer>
    </SliceContainer>
  );
};

DefaultSlice.propTypes = propTypes;

export default DefaultSlice;
