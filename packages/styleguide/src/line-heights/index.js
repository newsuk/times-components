import lineHeightMapping from "./mapping.web";

export default scale => ({ font, fontSize }) => {
  const mapping = lineHeightMapping({ scale });
  return mapping[font][fontSize];
};
