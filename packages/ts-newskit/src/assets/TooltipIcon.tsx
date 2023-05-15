import * as React from 'react';
const TooltipIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={16}
      height={16}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha'
      }}
    >
      <path
        fill="currentcolor"
        d="M7.333 4.667h1.334V6H7.334V4.667ZM7.333 7.333h1.334v4H7.334v-4Z"
      />
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M1.333 8A6.67 6.67 0 0 1 8 1.333 6.67 6.67 0 0 1 14.667 8 6.67 6.67 0 0 1 8 14.667 6.67 6.67 0 0 1 1.333 8Zm1.334 0A5.34 5.34 0 0 0 8 13.333 5.34 5.34 0 0 0 13.334 8 5.34 5.34 0 0 0 8 2.667 5.34 5.34 0 0 0 2.667 8Z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#a)">
      <path fill="currentcolor" d="M0 0h16v16H0z" />
    </g>
  </svg>
);
export default TooltipIcon;
