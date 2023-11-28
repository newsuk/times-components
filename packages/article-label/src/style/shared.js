import { fontFactory } from "@times-components/ts-styleguide";

const styles = {
  title: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMetaMobile"
    }),
    fontWeight: "400",
    lineHeight: 11,
    marginBottom: 0,
    marginTop: -1,
    paddingTop: 1
  }
};

export default styles;
