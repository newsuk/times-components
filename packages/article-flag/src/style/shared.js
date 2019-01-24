import styleguide from "@times-components/styleguide";

const { fontFactory, spacing } = styleguide();
const styles = {
  diamond: {
    marginRight: spacing(1)
  },
  flag: {
    marginRight: spacing(3)
  },
  flags: {
    flexDirection: "row"
  },
  title: {
    ...fontFactory({
      font: "bodyRegularSmallCaps",
      fontSize: "cardMetaMobile"
    }),
    fontWeight: "400",
    letterSpacing: 1.4
  },
  view: {
    alignItems: "center",
    flexDirection: "row"
  }
};

export default styles;
