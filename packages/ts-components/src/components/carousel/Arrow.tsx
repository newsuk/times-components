import React from 'react';

export const Arrow = ({ size = { width: '16', height: '16' } }) => {
  return (
    <svg
      width={size.width}
      height={size.height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.29 12.956L3.903 7.049 7.289.97h-.96L.697 7.013l5.632 5.943z"
        fillRule="nonzero"
      />
    </svg>
  );
};
