import { colours } from "@times-components/styleguide";

const stars = {
  disabled: {
    fillColour: "none",
    opacity: "0.4",
    strokeColour: colours.functional.secondary
  },
  initial: {
    fillColour: "none",
    opacity: "1",
    strokeColour: colours.functional.secondary
  },
  selected: {
    fillColour: colours.functional.action,
    opacity: "1",
    strokeColour: "none"
  }
};

export default stars;
