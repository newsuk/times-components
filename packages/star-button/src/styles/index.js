import { colours, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    height: 28,
    padding: spacing(1),
    width: 28
  }
};

const lightStar = {
  disabled: {
    fillColour: "none",
    opacity: "0.4",
    strokeColour: colours.star.light.default
  },
  initial: {
    fillColour: "none",
    opacity: "1",
    strokeColour: colours.star.light.default
  },
  selected: {
    fillColour: colours.star.light.selected,
    opacity: "1",
    strokeColour: "none"
  }
};

const darkStar = {
  disabled: {
    ...lightStar.disabled,
    strokeColour: colours.star.dark.default
  },
  initial: {
    ...lightStar.initial,
    strokeColour: colours.star.dark.default
  },
  selected: {
    ...lightStar.selected,
    fillColour: colours.star.dark.selected
  }
};

const getTheme = ({ isDark }) => (isDark ? darkStar : lightStar);

export { getTheme };
export default styles;
