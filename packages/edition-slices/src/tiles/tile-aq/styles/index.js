import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: spacing(2),
    paddingTop: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 22,
    lineHeight: 22
  },
  imageContainer: {
    marginBottom: spacing(2),
    width: "100%"
  },
  star: {
    bottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    position: "absolute",
    right: 0
  }
};

export default styles;
