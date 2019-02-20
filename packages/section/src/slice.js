import React from "react";
import PropTypes from "prop-types";
import sliceMap from "@times-components/edition-slices";
import withSliceTracking from "./slice-tracking-events";

const Slice = ({ slice, onPress }) => {
  const Component = sliceMap[slice.name];
  return Component ? <Component onPress={onPress} slice={slice} /> : null;
};

Slice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({}).isRequired
};

export default withSliceTracking(Slice);
