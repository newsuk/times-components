import { colours, spacing } from "@times-components/styleguide";

const styles = {
  header: {
    paddingHorizontal: spacing(3),
    paddingTop: spacing(3),
    width: "85%"
  },
  headline: {
    fontSize: 25
  },
  imageContainer: {
    alignSelf: "flex-end",
    width: "85%"
  },
  link: {
    flex: 1
  },
  puzzleContainer: {
    backgroundColor: colours.functional.border,
    flex: 1,
    marginHorizontal: spacing(1)
  }
};

export default styles;
