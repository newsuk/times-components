import styleguide from "@times-components/styleguide";

const { fontFactory } = styleguide();
const styles = {
  title: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMetaMobile"
    }),
    fontWeight: "400",
    letterSpacing: 1.2,
    marginBottom: 0
  }
};

export default styles;
