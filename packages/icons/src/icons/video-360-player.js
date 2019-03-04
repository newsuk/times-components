import React from "react";
import { colours } from "@times-components/styleguide";
import Svg, { Path } from "@times-components/svgs";
import { clean } from "@times-components/utils";
import propTypes from "./prop-types";

const ratio = 108 / 100;

const IconVideo360Player = ({
  fillColour,
  height,
  strokeColour,
  title = "Video 360 Player Icon",
  width
}) => (
  <Svg
    role="img"
    viewBox="0 0 108 100"
    {...clean({
      height,
      title,
      width: width || height * ratio
    })}
  >
    <Path
      {...clean({
        fill: fillColour,
        stroke: strokeColour
      })}
      d="M99.6045833,56.3184283 C96.4986239,80.9497387 75.4740254,100 50,100 C22.3857625,100 1.77635684e-13,77.6142375 1.77635684e-13,50 C1.77635684e-13,22.3857625 22.3857625,0 50,0 C75.9267405,0 97.2445016,19.7333865 99.7531238,45 L96.7371819,45 C94.2408556,21.3933667 74.2684283,3 50,3 C24.0426168,3 3,24.0426168 3,50 C3,75.9573832 24.0426168,97 50,97 C73.8634751,97 93.5731229,79.2153508 96.5976809,56.1773146 L88.6,61 L88.6,59.3941183 L98.0184118,50 L107.6,59.3941183 L107.6,61 L99.6045833,56.3184283 Z M24,60.7742857 L24,57.4428571 C25.4457143,58.3542857 27.0485714,58.9514286 28.7142857,58.9514286 C30.2857143,58.9514286 32.1085714,58.1028571 32.1085714,55.5885714 C32.1085714,53.8914286 31.1657143,52.0685714 27.6457143,52.0685714 L27.6457143,49.24 C30.1285714,49.24 31.9514286,48.4228571 31.9514286,46.0028571 C31.9514286,44.5571429 30.9457143,42.7971429 28.2428571,42.7971429 C26.5771429,42.7971429 25.2885714,43.4571429 24.5342857,43.8342857 L24.5342857,40.9114286 C25.98,40.1885714 27.3314286,40 28.62,40 C32.14,40 34.9685714,41.8542857 34.9685714,45.7514286 C34.9685714,48.8314286 33.1771429,49.9 32.2342857,50.4028571 C34.5285714,51.1885714 35.3142857,53.5142857 35.3142857,55.4942857 C35.3142857,59.5171429 32.2028571,62 28.7771429,62 C27.74,62 26.0428571,61.8428571 24,60.7742857 Z M47.6657143,40 L49.52,42.3571429 C44.5857143,45.5314286 43.4542857,48.7371429 42.9514286,50.2142857 C44.6171429,49.3342857 45.9685714,49.3342857 46.3457143,49.3342857 C49.5514286,49.3342857 52.3171429,51.88 52.3171429,55.5257143 C52.3171429,59.1714286 49.4257143,62 45.8742857,62 C43.2028571,62 39.0857143,60.2085714 39.0857143,54.2685714 C39.0857143,50.7485714 40.5,47.1028571 43.1085714,44.0228571 C44.6171429,42.2314286 45.9371429,41.2571429 47.6657143,40 Z M42.2914286,53.3885714 C42.2285714,53.7657143 42.1657143,54.1742857 42.1657143,55.0228571 C42.1657143,57.9142857 44.2714286,59.14 45.9057143,59.14 C47.6342857,59.14 49.3,57.8514286 49.3,55.62 C49.3,53.0742857 47.2257143,52.1628571 45.5914286,52.1628571 C44.02,52.1628571 43.1085714,52.8228571 42.2914286,53.3885714 Z M61.4,40 C65.2657143,40 68.1885714,44.4628571 68.1885714,50.9371429 C68.1885714,57.7257143 65.1714286,62 61.2742857,62 C57.2828571,62 54.36,57.82 54.36,51 C54.36,43.6771429 57.9114286,40 61.4,40 Z M61.2742857,42.9228571 C59.42,42.9228571 57.44,45.06 57.44,50.9371429 C57.44,57.5685714 59.6714286,59.0771429 61.2428571,59.0771429 C62.8771429,59.0771429 65.1085714,57.4428571 65.1085714,51.0314286 C65.1085714,43.7085714 62.1857143,42.9228571 61.2742857,42.9228571 Z M71.08,44.2428571 C71.08,41.8857143 72.9971429,40 75.3542857,40 C77.7114286,40 79.5971429,41.8857143 79.5971429,44.2428571 C79.5971429,46.6314286 77.68,48.5171429 75.3542857,48.5171429 C73.0285714,48.5171429 71.08,46.6314286 71.08,44.2428571 Z M72.7457143,44.2428571 C72.7457143,45.6885714 73.94,46.8514286 75.3542857,46.8514286 C76.7685714,46.8514286 77.9314286,45.6885714 77.9314286,44.2428571 C77.9314286,42.8285714 76.7685714,41.6657143 75.3542857,41.6657143 C73.9085714,41.6657143 72.7457143,42.8285714 72.7457143,44.2428571 Z"
    />
  </Svg>
);

IconVideo360Player.propTypes = propTypes;

IconVideo360Player.defaultProps = {
  fillColour: colours.functional.action
};

export default IconVideo360Player;
