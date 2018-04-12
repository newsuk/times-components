/* eslint-disable import/prefer-default-export */

const acceptedWidths = [320, 440, 660, 800, 1440];

export const normaliseWidth = width => {
  const nWidth = acceptedWidths.find(w => width <= w);

  return nWidth || acceptedWidths[acceptedWidths.length - 1];
};
