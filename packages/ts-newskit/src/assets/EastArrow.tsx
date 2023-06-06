import React from 'react';

const EastArrow: React.FC = (props: any) => {
  return (
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_4797_76249"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="33"
        height="33"
      >
        <path
          d="M20.3753 7.49951L18.4953 9.37951L24.602 15.4995H3.04199V18.1662H24.602L18.482 24.2862L20.3753 26.1662L29.7087 16.8328L20.3753 7.49951Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_4797_76249)">
        <rect x="0.375" y="0.833008" width="32" height="32" fill="#3B3B3B" />
      </g>
    </svg>
  );
};

export default EastArrow;
