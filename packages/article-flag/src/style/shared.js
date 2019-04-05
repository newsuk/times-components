import styleguide from "@times-components/styleguide";

const { fontFactory, spacing } = styleguide();
const styles = {
  bullet: {
    borderRadius: 2.5,
    height: 5,
    width: 5
  },
  flagPadding: {
    marginRight: spacing(3)
  },
  flags: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  title: {
    ...fontFactory({
      font: "bodyRegularSmallCaps",
      fontSize: "cardMetaMobile"
    }),
    fontWeight: "400",
    letterSpacing: 1.4,
    marginLeft: spacing(1)
  },
  view: {
    alignItems: "center",
    flexDirection: "row"
  }
};

export default styles;
