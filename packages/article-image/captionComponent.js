import Caption from "@times-components/caption";
import PropTypes from "prop-types";
import React from "react";

const captionStyle = {
  primary: {
    container: {
      paddingLeft: 10
    }
  },
  secondary: {
    container: {
      paddingTop: 0
    }
  },
  inline: {
    container: {
      paddingTop: 0
    }
  }
};

const CaptionComponent = ({ caption, credits, display }) => (
  <Caption text={caption} credits={credits} style={captionStyle[display]} />
);

CaptionComponent.propTypes = {
  caption: PropTypes.string,
  credits: PropTypes.string,
  display: PropTypes.string
};

CaptionComponent.defaultProps = {
  caption: "",
  credits: "",
  display: ""
};

export default CaptionComponent;
