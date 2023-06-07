import React from 'react';

const SeeAllLeft: React.FC = (props: any) => {
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
        id="mask0_4797_41229"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="17"
      >
        <path
          d="M11.6736 3.39289L10.4869 2.21289L3.89355 8.81289L10.4936 15.4129L11.6736 14.2329L6.25355 8.81289L11.6736 3.39289Z"
          fill="#0A0A0A"
        />
      </mask>
      <g mask="url(#mask0_4797_41229)">
        <rect y="0.8125" width="16" height="16" fill="#3B3B3B" />
      </g>
    </svg>
  );
};

export default SeeAllLeft;
