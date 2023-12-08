import * as React from 'react';
const VideoIcon: React.FC = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#01000D"
      fillRule="evenodd"
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm4-10-6-3.75v7.5L16 12Z"
      clipRule="evenodd"
    />
  </svg>
);
export default VideoIcon;
