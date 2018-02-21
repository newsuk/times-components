import React from "react";
import { propTypes, defaultProps } from "../proptypes";
import {
  getChildrenContainer,
  ChildContainer,
  Separator,
  SliceContainer
} from "./responsive";

const DefaultSlice = ({ children }) => {
  const ChildrenContainer = getChildrenContainer(children);
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
DefaultSlice.defaultProps = defaultProps;

export default DefaultSlice;
