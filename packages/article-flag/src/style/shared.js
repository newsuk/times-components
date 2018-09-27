import styleguide from "@times-components/styleguide";

const { fontFactory } = styleguide();
const styles = {
  view: {
    flexDirection: "row",
    alignItems: "center"
  },
  diamond: {
    marginRight: 5
  },
  title: {
    ...fontFactory({
      font: "bodyRegularSmallCaps",
      fontSize: "cardMetaMobile"
    }),
    fontWeight: "400",
    letterSpacing: 1.4
  }
};

export default styles;
