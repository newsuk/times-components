import { fontFactory, spacing } from "@times-components/ts-styleguide";

const styles = {
  container: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: -1,
    marginBottom: 1
  },
  iconContainer: {
    alignSelf: "center",
    paddingBottom: 2
  },
  title: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMetaMobile"
    }),
    flex: -1,
    fontWeight: "400",
    letterSpacing: 1.2,
    lineHeight: 12,
    marginLeft: spacing(1),
    paddingTop: 1
  }
};

export default styles;
