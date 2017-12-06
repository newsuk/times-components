import Caption from "@times-components/caption";
import styled from "styled-components";
import { View } from "react-native"
import PropTypes from "prop-types";
import React from "react";

const mediumBreakpoint = "768px";

const CaptionStyle = styled(View)`
padding-left: 10px;
@media (min-width: ${mediumBreakpoint}) {
  padding-left: 0px;
}
`;

const CaptionPrimary = (props) => (
  <CaptionStyle>
      <Caption text={props.caption} credits={props.credits} />
    </CaptionStyle>
);

CaptionPrimary.propTypes = {
  caption: PropTypes.string,
  credits: PropTypes.string,
}

CaptionPrimary.defaultProps = {
    caption: "This is caption",
    credits: "This is credit",
  };

export default CaptionPrimary;
