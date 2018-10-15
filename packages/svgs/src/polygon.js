import React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";
import SVGPath from "./path";

const { Path } = ART;

const toCoordinates = points =>
  points
    .split(/,|\s+/)
    .map(n => Number.parseFloat(n))
    .reduce((currentPoints, coordinate, index) => {
      if (index % 2 === 0) {
        return [...currentPoints, { x: coordinate }];
      }

      const point = currentPoints[currentPoints.length - 1];

      return [...currentPoints.slice(0, -1), { x: point.x, y: coordinate }];
    }, []);

const Polygon = ({ stroke, fill, points }) => {
  const pointsCoordinates = toCoordinates(points);

  const d = new Path().moveTo(pointsCoordinates[0].x, pointsCoordinates[0].y);

  for (let i = 1; i < pointsCoordinates.length; i += 1) {
    const { x, y } = pointsCoordinates[i];
    d.lineTo(x, y);
  }

  return <SVGPath d={d} fill={fill} stroke={stroke} />;
};

Polygon.propTypes = {
  fill: PropTypes.string,
  points: PropTypes.string.isRequired, // TODO validate they're even coordinates
  stroke: PropTypes.string
};

Polygon.defaultProps = {
  fill: null,
  stroke: null
};

export default Polygon;
