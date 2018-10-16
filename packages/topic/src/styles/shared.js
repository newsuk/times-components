import styleguideFactory from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguideFactory();
const styles = {
  container: {
    alignItems: "center"
  },
  description: {
    ...fontFactory({
      font: "body",
      fontSize: "tertiary"
    }),
    color: colours.functional.primary,
    textAlign: "center"
  },
  divider: {
    borderStyle: "solid",
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1,
    justifyContent: "center",
    marginBottom: spacing(5),
    width: 200
  },
  name: {
    ...fontFactory({
      font: "headline",
      fontSize: "pageHeadline"
    }),
    color: colours.functional.brandColour,
    textAlign: "center"
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: colours.functional.backgroundPrimary,
    borderBottomColor: colours.functional.border,
    borderBottomWidth: 1,
    flexDirection: "column",
    minHeight: 90,
    paddingHorizontal: spacing(2),
    paddingTop: spacing(8),
    width: "100%"
  }
};

export default styles;
