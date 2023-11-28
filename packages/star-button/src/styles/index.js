const styles = {
  container: {
    borderRadius: 9999,
    height: 28,
    overflow: "hidden",
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },
};

const themes = {
  dark: {
    default: "#CCC",
    selected: "#3C81BE",
  },
  light: {
    default: "#696969",
    selected: "#006699",
  },
};

const lightStar = {
  disabled: {
    fillColour: "none",
    opacity: "0.4",
    strokeColour: themes.light.default,
  },
  initial: {
    fillColour: "none",
    opacity: "1",
    strokeColour: themes.light.default,
  },
  selected: {
    fillColour: themes.light.selected,
    opacity: "1",
    strokeColour: "none",
  },
};

const darkStar = {
  disabled: {
    ...lightStar.disabled,
    strokeColour: themes.dark.default,
  },
  initial: {
    ...lightStar.initial,
    strokeColour: themes.dark.default,
  },
  selected: {
    ...lightStar.selected,
    fillColour: themes.dark.selected,
  },
};

const getTheme = ({ isDark }) => (isDark ? darkStar : lightStar);

export { getTheme };
export default styles;
