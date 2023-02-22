import * as React from 'react';

const SearchIcon = (props: any) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m15.022 16-5.844-5.844a4.9 4.9 0 0 1-1.556.9 5.5 5.5 0 0 1-1.889.322c-1.6 0-2.955-.556-4.066-1.667C.556 8.6 0 7.26 0 5.69c0-1.57.556-2.911 1.667-4.022C2.777.556 4.126 0 5.71 0c1.57 0 2.908.556 4.011 1.667 1.104 1.11 1.656 2.452 1.656 4.022 0 .637-.104 1.252-.311 1.844a5.64 5.64 0 0 1-.934 1.667L16 15.022l-.978.978Zm-9.31-5.956c1.2 0 2.221-.425 3.066-1.277.844-.852 1.266-1.878 1.266-3.078S9.622 3.463 8.778 2.61C7.933 1.76 6.91 1.333 5.71 1.333c-1.215 0-2.248.426-3.1 1.278-.852.852-1.278 1.878-1.278 3.078s.426 2.226 1.278 3.078c.852.852 1.885 1.277 3.1 1.277Z"
      fill="currentcolor"
    />
  </svg>
);

export default SearchIcon;
