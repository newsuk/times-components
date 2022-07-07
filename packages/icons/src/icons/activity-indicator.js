import React from "react";
import { colours } from "@times-components/ts-styleguide";
import styled, { keyframes } from "styled-components";
import propTypes from "./prop-types";

const ActivityIndicatorAnimation = keyframes`
 100% { transform: rotate(1turn); };
`;
const ActivityIndicatorSpinner = styled.div`
  aspect-ratio: 1;
  width: 54%;
  height: 54%;
  border-radius: 20px;
  border: 0.2em solid rgba(25, 118, 210, 0.2);
  border-right-color: rgb(25, 118, 210);
  animation-name: ${ActivityIndicatorAnimation};
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const ActivityIndicatorContainer = styled.div`
  border-radius: 50%;
  overflow: "hidden";
  height: 40px;
  width: 40px;
  display: grid;
  place-items: center;
  :hover {
    background-color: #f5f5f5;
  }
`;

const IconActivityIndicator = ({
  fillColour,
  title = "Activity Indicator"
}) => (
  <ActivityIndicatorContainer>
    <ActivityIndicatorSpinner
      data-fill-colour={fillColour}
      data-title={title}
    />
  </ActivityIndicatorContainer>
);

IconActivityIndicator.propTypes = propTypes;

IconActivityIndicator.defaultProps = {
  fillColour: colours.functional.action
};

export default IconActivityIndicator;
