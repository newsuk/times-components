import React from "react";
import PropTypes from "prop-types";

const BookmarkIcon = ({ height, width, visibility }) => (
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
    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
  </svg>
);

BookmarkIcon.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  visibility: PropTypes.string
};

BookmarkIcon.defaultProps = {
  height: 16,
  width: 16,
  visibility: "visible"
};

export default BookmarkIcon;
