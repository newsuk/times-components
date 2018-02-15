import defaultStyles from "./default";
import leadStyles from "./lead";

const templateStyles = {
  defaultStyles,
  leadStyles
};

export default template => templateStyles[`${template}Styles`];
