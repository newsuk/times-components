import defaultStyles from "./default.styles.js";

const templateStyles = {
  defaultStyles
};

export default template => templateStyles[`${template}Styles`];
