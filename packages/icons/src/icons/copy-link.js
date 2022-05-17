import React from "react";
import { colours } from "@times-components/ts-styleguide";
import Svg, { Path } from "@times-components/svgs";
import { clean } from "@times-components/utils";
import propTypes from "./prop-types";

const IconCopyLink = ({
  fillColour,
  height,
  opacity,
  strokeColour,
  title = "Copy link to clipboard",
  width
}) => (
  <Svg
    aria-label="icon-copy-link"
    role="img"
    viewBox="0 0 15 15"
    {...clean({
      height,
      title,
      width: width || height
    })}
  >
    <Path
      {...clean({
        fill: fillColour,
        opacity,
        stroke: strokeColour
      })}
      d="M13.936 1.12A3.532 3.532 0 0 0 11.36 0a3.53 3.53 0 0 0-2.575 1.119l-3.22 3.38c-1.42 1.49-1.42 3.914 0 5.405.229.24.49.43.763.596L7.71 9.052a1.793 1.793 0 0 1-.857-.5 1.924 1.924 0 0 1-.455-.827v-.002a1.984 1.984 0 0 1-.06-.324l-.001-.011a2.074 2.074 0 0 1-.005-.32l.002-.025c.009-.103.024-.206.048-.307.001-.009.005-.017.007-.026.08-.314.23-.614.464-.86l3.22-3.38a1.776 1.776 0 0 1 1.288-.558c.465 0 .932.187 1.287.559a1.98 1.98 0 0 1 0 2.703l-1.119 1.174c.03.082.05.167.075.25l.001.002a5.013 5.013 0 0 1 .216 1.702l-.007.082c-.008.134-.013.268-.032.402l2.154-2.26c1.42-1.491 1.42-3.917 0-5.406zM8.672 4.5l-1.38 1.45c.312.08.611.24.856.497.227.24.373.526.456.828v.003c.029.107.048.214.06.323v.011c.01.107.013.213.006.32l-.003.026a2.01 2.01 0 0 1-.047.307c-.002.01-.006.018-.008.026-.08.314-.23.613-.464.86l-3.22 3.378c-.356.374-.822.56-1.288.56-.465 0-.932-.186-1.287-.56a1.978 1.978 0 0 1 0-2.702l1.119-1.175c-.03-.082-.05-.167-.075-.25l-.02-.069A4.982 4.982 0 0 1 3.18 6.7c0-.029.004-.056.006-.083.008-.134.013-.268.032-.402l-2.154 2.26c-1.42 1.49-1.42 3.915 0 5.405A3.537 3.537 0 0 0 3.64 15c.973 0 1.887-.398 2.576-1.119l3.22-3.379c1.419-1.49 1.419-3.915 0-5.404a3.644 3.644 0 0 0-.764-.598z"
    />
  </Svg>
);

IconCopyLink.propTypes = propTypes;

IconCopyLink.defaultProps = {
  fillColour: colours.functional.secondary,
  height: 15,
  width: 15
};

export default IconCopyLink;
