import React from 'react';

const SeeAllRight: React.FC = (props: any) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_4797_41239"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="17"
      >
        <path
          d="M4.32666 14.2329L5.50666 15.4129L12.1067 8.81289L5.50666 2.21289L4.32666 3.39289L9.74666 8.81289L4.32666 14.2329Z"
          fill="#0A0A0A"
        />
      </mask>
      <g mask="url(#mask0_4797_41239)">
        <rect y="0.8125" width="16" height="16" fill="#3B3B3B" />
      </g>
    </svg>
  );
};

export default SeeAllRight;
