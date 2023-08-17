import React, { SVGProps } from 'react';

const VideoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="18"
    height="20"
    viewBox="0 0 22 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <rect width="22" height="24" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref="#image0_3031_245372"
          transform="matrix(0.0454545 0 0 0.0416667 -0.0909091 0)"
        />
      </pattern>
      <image
        id="image0_3031_245372"
        width="24"
        height="24"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA90lEQVR4nN2UPQrCQBCFPwJJZeElvI5GkZSexc6ot/AXbD2Incaf9LaihZUrC5NGk+wmEYQ8eE0yM2+Znwd1hwcEwAqIgIcwkm+BxJRCD4gBZeAF6BYp7AATi8Lqg2PJNWJaorgShjZtURXpZxX3pJ9VBeKswQeGxF0BkX6awNqQ5AAD4GohsEgTOBmSEjSAIfDMidV38oW7pUCCFrDJiNW1fiKwzYi9pQkcLQWasu95LTqkCSx/OOTZX9bUBc4VDkyZDg1xxSrFX0AbA8o4qRKOsIAj1lv05aGtXSfwLWeiHaBDSbiyEdpb9G7rY9TcA3P5p2NqjDd1yyIEG3kosgAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);

export default VideoIcon;
