import defaultStyles from "./default";

const templateStyles = {
  defaultStyles
};

export default template => templateStyles[`${template}Styles`];
