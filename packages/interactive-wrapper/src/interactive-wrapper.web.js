/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from "react";
import PropTypes from "prop-types";

export default function InteractiveWrapper(props) {
  const Element = props.element;
  return (
    <Fragment>
      <link href={props.source} rel="import" />
      <Element {...props.attributes} />
    </Fragment>
  );
}
InteractiveWrapper.propTypes = {
  attributes: PropTypes.object,
  element: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired
};
InteractiveWrapper.defaultProps = {
  attributes: {}
};
