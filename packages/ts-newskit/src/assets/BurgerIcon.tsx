import React from 'react';

const BurgerIcon = (props: any) => (
  <svg
    width={16}
    height={12}
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 12v-1.5h16V12H0Zm0-5.25v-1.5h11.556v1.5H0ZM0 1.5V0h16v1.5H0Z"
      fill="#fff"
    />
  </svg>
);

export default BurgerIcon;
