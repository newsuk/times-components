import styleguideFactory, { spacing } from "@times-components/styleguide";

const { fontFactory } = styleguideFactory();

const styles = {
  container: {
    alignItems: "center",
    flexDirection: "row"
  },
  iconContainer: {
    paddingBottom: spacing(1)
  },
  title: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMetaMobile"
    }),
    fontWeight: "400",
    letterSpacing: 1.2,
    marginLeft: 5,
    padding: 0,
    position: "relative",
    top: 1
  }
};

export default styles;
