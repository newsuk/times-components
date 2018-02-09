import defaultStyles from "./default/base";

const templateStyles = {
  defaultStyles
};

export default template => templateStyles[`${template}Styles`];
