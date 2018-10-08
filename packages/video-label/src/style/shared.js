import styleguideFactory from "@times-components/styleguide";

const { fontFactory } = styleguideFactory();

const styles = {
  container: {
    alignItems: "center",
    flexDirection: "row"
  },
  iconContainer: {
    paddingBottom: 2
  },
  title: {
    fontWeight: "400",
    letterSpacing: 1.2,
    marginLeft: 5,
    padding: 0,
    position: "relative",
    top: 2,
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMetaMobile"
    })
  }
};

export default styles;
