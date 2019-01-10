const convertToHex = rgbaNumber => {
  const hexString = rgbaNumber.toString(16);
  return hexString.length % 2 ? `0${hexString}` : hexString;
};

export default colour =>
  colour && colour.rgba
    ? `#${convertToHex(colour.rgba.red)}${convertToHex(
        colour.rgba.green
      )}${convertToHex(colour.rgba.blue)}`.toUpperCase()
    : null;
