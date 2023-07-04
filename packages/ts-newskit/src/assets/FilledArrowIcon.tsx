import React from "react"

const FilledArrowIcon: React.FC = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentcolor"
      d="m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8Z"
    />
  </svg>
)
export default FilledArrowIcon;
