import React from "react";
import PropTypes from "prop-types";

const CommentIcon = ({ height, width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={{
      fill: "rgba(0, 0, 0, 1)",
      transform: "scaleX(-1)"
    }}
  >
    <path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z" />
  </svg>
);

CommentIcon.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};

CommentIcon.defaultProps = {
  height: 16,
  width: 16
};

export default CommentIcon;
