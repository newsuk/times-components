import React from "react";
// import { View } from "react-native";
import { propTypes, defaultProps } from "../proptypes";
import { getChildrenContainer, Separator, SliceContainer } from "./responsive";

const DefaultSlice = ({ children }) => {
  const ChildrenContainer = getChildrenContainer(children);
  return (
    <SliceContainer>
      <ChildrenContainer>
      {
        children.reduce((previous, current) => [
          ...(previous.length > 0 ? previous : [previous]),
          <Separator key={`separator-${current.key}`} />,
          current
        ])
      }
      </ChildrenContainer>
    </SliceContainer>
  )
};

DefaultSlice.propTypes = propTypes;
DefaultSlice.defaultProps = defaultProps;

export default DefaultSlice;
