export default colour =>
  colour && colour.rgba
    ? `rgba(${colour.rgba.red}, ${colour.rgba.green}, ${colour.rgba.blue}, ${
        colour.rgba.alpha
      })`
    : null;
