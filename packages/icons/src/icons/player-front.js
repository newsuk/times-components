import React from "react";
import PropTypes from "prop-types";
import { clean } from "@times-components/utils";

const PlayerFront = ({
  fill = "black",
  width = 24,
  height = 25,
  title = "Player Front Icon"
}) => (
  <svg
    aria-label="player-front-icon"
    role="img"
    viewBox="0 0 24 25"
    {...clean({ width, height, title })}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <mask
      id="mask0_4528_3102"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="25"
    >
      <path
        d="M9 16.9174V11.6174H7.65V10.3924H10.25V16.9174H9ZM12.675 16.9174C12.3633 16.9174 12.1021 16.812 11.8912 16.6011C11.6804 16.3903 11.575 16.129 11.575 15.8174V11.4924C11.575 11.1807 11.6804 10.9195 11.8912 10.7086C12.1021 10.4978 12.3633 10.3924 12.675 10.3924H14.75C15.0617 10.3924 15.3229 10.4978 15.5337 10.7086C15.7446 10.9195 15.85 11.1807 15.85 11.4924V15.8174C15.85 16.129 15.7446 16.3903 15.5337 16.6011C15.3229 16.812 15.0617 16.9174 14.75 16.9174H12.675ZM12.825 15.6674H14.6V11.6174H12.825V15.6674ZM12 22.6674C10.75 22.6674 9.57917 22.434 8.4875 21.9674C7.39583 21.5007 6.44167 20.859 5.625 20.0424C4.80833 19.2257 4.16667 18.2715 3.7 17.1799C3.23333 16.0882 3 14.9174 3 13.6674C3 12.4174 3.23333 11.2465 3.7 10.1549C4.16667 9.06322 4.80833 8.10905 5.625 7.29238C6.44167 6.47572 7.39583 5.83405 8.4875 5.36738C9.57917 4.90072 10.75 4.66738 12 4.66738H12.525L10.575 2.71738L11.6 1.69238L15.275 5.36738L11.6 9.04238L10.575 8.01738L12.425 6.16738H12C9.91072 6.16738 8.13839 6.89506 6.68303 8.35041C5.22768 9.80577 4.5 11.5781 4.5 13.6674C4.5 15.7567 5.22768 17.529 6.68303 18.9844C8.13839 20.4397 9.91072 21.1674 12 21.1674C14.0893 21.1674 15.8616 20.4397 17.317 18.9844C18.7723 17.529 19.5 15.7567 19.5 13.6674H21C21 14.9174 20.7667 16.0882 20.3 17.1799C19.8333 18.2715 19.1917 19.2257 18.375 20.0424C17.5583 20.859 16.6042 21.5007 15.5125 21.9674C14.4208 22.434 13.25 22.6674 12 22.6674Z"
        fill={fill}
      />
    </mask>

    <g mask="url(#mask0_4528_3102)">
      <rect y="0.666992" width="24" height="24" fill="#01000D" />
    </g>
  </svg>
);

PlayerFront.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string
};

PlayerFront.defaultProps = {
  fill: "black",
  width: 24,
  height: 25,
  title: "Player Front Icon"
};

export default PlayerFront;
