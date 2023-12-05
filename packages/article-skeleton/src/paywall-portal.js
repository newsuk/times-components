import React from "react";
import PropTypes from "prop-types";
import get from "lodash.get";

const PaywallPortal = ({ id, componentName }) => {
  if (typeof window !== "undefined") {
    const componentToRender = get(window, `paywallComponent.${componentName}`);

    if (componentToRender) {
      return (
        // eslint-disable-next-line
        <div id={id} dangerouslySetInnerHTML={{ __html: componentToRender }} />
      );
    }
  }

  return <div id={id} />;
};

PaywallPortal.propTypes = {
  id: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired
};

export default PaywallPortal;
