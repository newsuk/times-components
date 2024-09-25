import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill={props.color}
      fillRule="evenodd"
      d="M.333 7.5A6.67 6.67 0 0 1 7 .833 6.67 6.67 0 0 1 13.667 7.5 6.67 6.67 0 0 1 7 14.167 6.67 6.67 0 0 1 .333 7.5Zm9.334 0-4-3v6l4-3Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent