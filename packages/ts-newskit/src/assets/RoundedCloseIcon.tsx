import * as React from 'react';

const RoundedCloseIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      style={{
        maskType: 'alpha'
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={16}
      height={16}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.332 7.999a6.67 6.67 0 0 1 6.667-6.667 6.67 6.67 0 0 1 6.666 6.667A6.67 6.67 0 0 1 8 14.665 6.67 6.67 0 0 1 1.332 8Zm7.333.666h2.667V7.332H8.665V4.665H7.332v2.667H4.665v1.333h2.667v2.667h1.333V8.665Z"
        fill="#0A0A0A"
      />
    </mask>
    <g mask="url(#a)">
      <path fill="currentcolor" d="M0 0h16v16H0z" />
    </g>
  </svg>
);

export default RoundedCloseIcon;
