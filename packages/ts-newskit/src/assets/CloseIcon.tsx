import * as React from 'react';

const CloseIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <mask
      id="closeIconMask"
      style={{
        maskType: 'alpha'
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}
    >
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
    </mask>
    <g mask="url(#closeIconMask)">
      <path fill="currentcolor" d="M0 0h24v24H0z" />
    </g>
  </svg>
);

export default CloseIcon;
