import * as React from 'react';

const ChevronIcon = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentcolor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="currentcolor"
      d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
    />
  </svg>
);

export default ChevronIcon;
