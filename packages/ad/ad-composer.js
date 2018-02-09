import React from "react";
import PropTypes from "prop-types";
import { Broadcast } from "react-broadcast";

const AdComposer = props => (
  <Broadcast channel="adConfig" value={props.adConfig}>
    {props.children}
  </Broadcast>
);

AdComposer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  adConfig: PropTypes.shape({
    networkId: PropTypes.string.isRequired,
    adUnit: PropTypes.string.isRequired,
    pageTargeting: PropTypes.shape({})
  })
};

AdComposer.defaultProps = {
  adConfig: {
    networkId: "25436805",
    adUnit: "d.thetimes.co.uk",
    pageTargeting: {
      title: "This is title",
      label: "This is label"
    }
  }
};
export default AdComposer;
