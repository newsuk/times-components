import React from 'react';

const FilledArrowIcon: React.FC = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="currentcolor"
      d="m3.166 8 .94.94 3.727-3.72v8.113h1.333V5.22l3.72 3.727.947-.947-5.334-5.333L3.166 8Z"
    />
  </svg>
);
export default FilledArrowIcon;
