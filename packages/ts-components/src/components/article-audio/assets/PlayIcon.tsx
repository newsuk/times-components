import * as React from 'react';

interface PlayIconProps {
    color?: string; 
  }

  const PlayIcon: React.FC<PlayIconProps> = ({ color = '#3B3B3B', ...props }) => (

<svg {...props} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_4690_6011" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="16">
    <path d="M5.33545 3.33337L5.33545 12.6667L12.6688 8.00004L5.33545 3.33337Z" fill="#0A0A0A"/>
  </mask>
  <g mask="url(#mask0_4690_6011)">
    <rect x="0.00195312" width="16" height="16" fill={color}/>
  </g>
</svg>


);

export default PlayIcon



