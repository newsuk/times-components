import React from 'react';

const CloseIconBlack: React.FC<any> = ({
  width,
  height,
  color = '#000',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <path
      d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
      fill={color}
    />
  </svg>
);

export default CloseIconBlack;
