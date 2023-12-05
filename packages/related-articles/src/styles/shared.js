import { colours, fontFactory, spacing } from "@times-components/ts-styleguide";

const styles = {
  byline: {
    marginBottom: 0
  },
  headline: {
    color: colours.functional.primary,
    ...fontFactory({
      font: "headline",
      fontSize: "smallHeadline"
    }),
    fontWeight: "400",
    marginBottom: spacing(1),
    marginTop: 0
  },
  opinionByline: {
    lineHeight: 24,
    marginBottom: 0,
    marginTop: 0
  },
  title: {
    color: colours.functional.primary,
    ...fontFactory({
      font: "headline",
      fontSize: "pageComponentHeadline"
    })
  },
  titleContainer: {
    alignItems: "center",
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1,
    display: "flex",
    justifyContent: "center",
    padding: spacing(2)
  }
};

export default styles;
