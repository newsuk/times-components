import React from "react";
import PropTypes from "prop-types";
import PaginationBase, { withPageState } from "./pagination.base";
import withTrackEvents from "./track";

const Pagination = props => (
  <PaginationBase
    {...props}
    hideBorderTop={!props.hideResults}
    style={props.hideResults ? {} : { container: { marginTop: 30 } }}
  />
);

Pagination.propTypes = {
  hideResults: PropTypes.bool
};

Pagination.defaultProps = {
  hideResults: false
};

export default withTrackEvents(Pagination);
export { withPageState };
