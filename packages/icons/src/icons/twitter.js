import React from "react";
import { colours } from "@times-components/ts-styleguide";
import { clean } from "@times-components/utils";
import propTypes from "./prop-types";

const ratio = 75 / 60;

const IconTwitter = ({
  fillColour,
  height,
  strokeColour,
  title = "Twitter Icon",
  width,
}) => (
  <svg
    aria-label="icon-twitter"
    role="img"
    viewBox="0 0 24 24"
    {...clean({
      height,
      title,
      width: width || height * ratio,
    })}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <g clipPath="url(#clip0_2702_211136)">
      <path
        {...clean({
          fill: fillColour,
          stroke: strokeColour,
        })}
        d="M13.9761 10.1624L22.7186 0H20.6469L13.0558 8.82384L6.99289 0H0L9.16837 13.3432L0 24H2.07179L10.0881 14.6817L16.491 24H23.4839L13.9756 10.1624H13.9761ZM11.1385 13.4608L10.2096 12.1321L2.81829 1.55962H6.00044L11.9653 10.0919L12.8942 11.4206L20.6479 22.5113H17.4657L11.1385 13.4613V13.4608Z"
      />
    </g>
    <defs>
      <clipPath>
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

IconTwitter.propTypes = propTypes;

IconTwitter.defaultProps = {
  fillColour: colours.functional.action,
};

export default IconTwitter;
