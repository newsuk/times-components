import * as React from 'react';
const BreadcrumbIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill={props.color}
      d="m6.667 4-.94.94L8.78 8l-3.053 3.06.94.94 4-4-4-4Z"
    />
  </svg>
);
export default BreadcrumbIcon;
