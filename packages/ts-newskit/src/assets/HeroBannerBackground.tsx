import React from 'react';

const HeroBannerBackground: React.FC = (props: any) => {
  return (
    <svg
      width="495"
      height="350"
      viewBox="0 0 495 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M187.913 35.1593C242.986 35.1598 245.67 11.8268 287.259 3.69804C372.776 -13.017 427.987 46.0559 459.698 89.9916C548.045 256.668 443.471 334.886 407.468 346.898C371.465 358.91 297.308 325.095 259.823 325.095C222.652 325.095 195.819 330.502 162.744 337.166L161.902 337.335C-95.1947 389.132 34.2623 243.052 23.4371 187.013C4.69505 89.9914 100.231 35.1584 187.913 35.1593Z"
        fill="#FFEED9"
      />
      {props.children}
    </svg>
  );
};

export default HeroBannerBackground;
