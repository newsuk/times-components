import styleguide from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguide();
const styles = {
  container: {
    alignItems: "center",
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1,
    borderStyle: "solid",
    marginBottom: spacing(5),
    width: "100%"
  },
  headline: {
    color: colours.functional.primary,
    ...fontFactory({
      font: "headline",
      fontSize: "commentsHeadline"
    }),
    maxWidth: 315,
    paddingBottom: spacing(2),
    paddingTop: spacing(6),
    textAlign: "center"
  },
  supporting: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "supporting",
      fontSize: "tertiary"
    }),
    textAlign: "center",
    maxWidth: 280
  },
  link: {
    color: colours.functional.action
  },
  button: {
    marginTop: spacing(5),
    maxWidth: 215,
    marginBottom: spacing(0)
  }
};

export default styles;
