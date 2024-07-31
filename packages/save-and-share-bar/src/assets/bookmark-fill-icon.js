import React from "react";
import PropTypes from "prop-types";

const BookmarkFillIcon = ({ height, width, visibility }) => (
  <svg
    data-id="bookmark-icon-svg_outline"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-hidden="true"
    focusable="false"
    style={{ visibility }}
    fill="currentColor"
    width={width}
    height={height}
  >
    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
  </svg>
);

BookmarkFillIcon.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  visibility: PropTypes.string
};

BookmarkFillIcon.defaultProps = {
  height: 16,
  width: 16,
  visibility: "visible"
};

export default BookmarkFillIcon;
