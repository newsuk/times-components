import { colours, spacing } from "@times-components/styleguide";

const styles = {
  header: {
    paddingHorizontal: spacing(2),
    paddingTop: spacing(2),
    height: 80
  },
  headline: {
    fontSize: 22,
    lineHeight: 22
  },
  imageContainer: {
    alignSelf: "flex-end",
    width: "85%",
    marginTop: spacing(-5)
  },
  puzzleContainer: {
    backgroundColor: colours.functional.border,
    flex: 1,
    marginHorizontal: spacing(1),
    height: 150,
    overflow: "hidden"
  }
};

export default styles;
