import React from "react";
import { ART } from "react-native";
const { Shape, Transform, Path } = ART;

const toCoordinates = (points) => points
    .split(/,|\s+/)
    .map(n => Number.parseFloat(n))
    .reduce((points, coordinate, index) => {
        if (index % 2 == 0) {
            return [...points, { x: coordinate }];
        }

        const point = points[points.length - 1];

        return [...points.slice(0, -1), { x: point.x, y: coordinate }]
    }, []);

const Polygon = ({ stroke, fill, points }) => {
    const pointsCoordinates = toCoordinates(points)

    const d = new Path()
        .moveTo(pointsCoordinates[0].x, pointsCoordinates[0].y);

    for (i = 1; i < pointsCoordinates.length; i++) {
        const { x, y } = pointsCoordinates[i];
        d.lineTo(x, y);
    }

    return <Shape
        fill={fill}
        d={d} />
}

export default Polygon;
