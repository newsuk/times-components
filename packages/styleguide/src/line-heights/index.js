import lineHeightMapping from "./mapping";

export default scale => ({ font, fontSize }) => {
  const mapping = lineHeightMapping({ scale });
  return mapping[font][fontSize];
};
