import React from 'react';

const WaveBg = (props: any) => (
  <svg
    width="100%"
    height={24}
    viewBox="0 0 1440 24"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_3001_253095"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="100%"
      height="24"
    >
      <path
        d="M474.841 15.7801C158.779 25.2562 18.9736 20.2453 0 7.33101V0L1440 0.10673V13.8289C1373.09 21.4422 1238.28 27.2728 1014.59 20.3727C791.335 13.4861 558.225 13.8289 474.841 15.7801Z"
        fill="currentcolor"
      />
    </mask>
    <g mask="url(#mask0_3001_253095)">
      <rect width="100%" height="24" fill="currentcolor" />
    </g>
  </svg>
);

export default WaveBg;
