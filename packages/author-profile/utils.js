/* eslint-disable import/prefer-default-export */

const acceptedWidths = [800, 660, 440, 320];

export const normaliseWidth = width => {
  const nWidth = acceptedWidths.find(w => width >= w);

  return nWidth || acceptedWidths[acceptedWidths.length - 1];
};
