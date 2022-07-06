import { colours, spacing } from "@times-components/ts-styleguide";

const styles = {
  header: {
    paddingLeft: spacing(3),
    paddingRight: spacing(3),
    paddingTop: spacing(3),
    width: "85%"
  },
  headline: {
    fontSize: 25,
    lineHeight: 25
  },
  imageContainer: {
    alignSelf: "flex-end",
    width: "85%"
  },
  puzzleContainer: {
    backgroundColor: colours.functional.border,
    flex: 1,
    marginTop: spacing(2)
  }
};

export default styles;
