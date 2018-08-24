import React, { Fragment } from "react";
import PropTypes from "prop-types";

 export default function Interactive(props) {
  const Element = props.element;
  const elementProps = Object.keys(props.attributes).map(k => ({[k]: props.attributes[k]}));
   return (
    <Fragment>
      <link
        rel="import"
        href={props.source}
      />
      <Element {...props.attributes} />
    </Fragment>
  );
}
 Interactive.propTypes = {
  attributes: PropTypes.object,
  element: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
}
