import styleguideFactory from "@times-components/styleguide";

const styleguide = styleguideFactory();

const styles = {
  container: {
    alignItems: "center",
    flexDirection: "row"
  },
  title: {
    top: 2,
    ...styleguide.fontFactory({
      font: "supporting",
      fontSize: "cardMetaMobile"
    }),
    fontWeight: "400",
    letterSpacing: 1.2,
    padding: 0,
    marginLeft: 5,
    position: "relative"
  },
  iconContainer: {
    paddingBottom: 2
  }
};

export default styles;
