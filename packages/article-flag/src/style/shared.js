import styleguide from "@times-components/styleguide";

const { fontFactory } = styleguide();
const styles = {
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
  },
  view: {
    alignItems: "center",
    flexDirection: "row"
  }
};

export default styles;
