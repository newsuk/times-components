import { colours, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    alignSelf: "flex-start",
    padding: spacing(1)
  }
};

const lightStar = {
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

const darkStar = {
  disabled: {
    ...lightStar.disabled,
    strokeColour: colours.functional.greyLabel
  },
  initial: {
    ...lightStar.initial,
    strokeColour: colours.functional.greyLabel
  },
  selected: {
    ...lightStar.selected,
    fillColour: colours.functional.articleFlagUpdated
  }
};

const getTheme = ({ isDark }) => (isDark ? darkStar : lightStar);

export { getTheme };
export default styles;
