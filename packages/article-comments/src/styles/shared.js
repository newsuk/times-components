import styleguide from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguide();
const styles = {
  button: {
    marginBottom: spacing(0),
    marginTop: spacing(5),
    maxWidth: 215
  },
  container: {
    alignItems: "center",
    borderStyle: "solid",
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1,
    marginBottom: spacing(10),
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
  link: {
    color: colours.functional.action
  },
  supporting: {
    ...fontFactory({
      font: "supporting",
      fontSize: "tertiary"
    }),
    color: colours.functional.secondary,
    maxWidth: 280,
    textAlign: "center"
  }
};

export default styles;
